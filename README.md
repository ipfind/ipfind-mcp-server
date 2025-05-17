# IP Find MCP Server
[![smithery badge](https://smithery.ai/badge/@ipfind/ipfind-mcp-server)](https://smithery.ai/server/@ipfind/ipfind-mcp-server)

A Model Context Protocol server that enables AI assistants to use IP Find. 

## How It Works

The MCP server:

-   Connects to your IP Find API and allows AI Assistants to get locations of IP Addresses.

## Usage with Claude Desktop

### Prerequisites

-   NodeJS
-   MCP Client (like Claude Desktop App)
-   IP Find API Key

### Installing via Smithery

To install IP Find MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@ipfind/ipfind-mcp-server):

```bash
npx -y @smithery/cli install @ipfind/ipfind-mcp-server --client claude
```

### Installation

To use this server with the Claude Desktop app, add the following configuration to the "mcpServers" section of your `claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "ipfind": {
            "command": "npx",
            "args": ["-y", "@ipfind/ipfind-mcp-server"],
            "env": {
                "IPFIND_API_KEY": "<API KEY GOES HERE>"
            }
        }
    }
}
```

-   `IPFIND_API_KEY` - You can generate an API key at IPfind.com.
