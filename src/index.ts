#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { IPFind } from "./ipfind.js";

const server = new Server(
  {
    name: "IP Find",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

let apiKey = process.env.IPFIND_API_KEY;

if (!apiKey) {
  console.error("IPFIND_API_KEY not provided in environment variables.");
  process.exit(1);
}

const ipfind = new IPFind(apiKey);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_ip_location",
        description: "Get the location of an IP address",
        inputSchema: {
          type: "object",
          properties: {
            ipAddress: {
              type: "string",
              description: "The IP address to get the location of.",
            },
          },
        },
      },
      {
        name: "get_my_location",
        description: "Get the location of the current IP address",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_api_usage",
        description: "Get the usage of the API",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (request.params.name === "get_ip_location") {
      const input = request.params.arguments as { ipAddress: string };
      const output = await ipfind.apiRequest.getIPLocation(input.ipAddress);

      if (!output) {
        throw new Error("Failed to fetch IP location.");
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(output, null, 2),
          },
        ],
      };
    }

    if (request.params.name === "get_my_location") {
      const output = await ipfind.apiRequest.getMyLocation();

      if (!output) {
        throw new Error("Failed to fetch my location.");
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(output, null, 2),
          },
        ],
      };
    }

    if (request.params.name === "get_api_usage") {
      const output = await ipfind.apiRequest.getAPIUsage();

      if (!output) {
        throw new Error("Failed to fetch API usage.");
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(output, null, 2),
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${request.params.name}`);
  } catch (err: unknown) {
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: String(err),
        },
      ],
    };
  }
});

try {
  const transport = new StdioServerTransport();
  await server.connect(transport);
} catch (error) {
  console.error(error);
}
