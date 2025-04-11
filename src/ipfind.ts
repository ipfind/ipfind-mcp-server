import type { IPFindIPResponse, IPFindUsageResponse } from './types.js';
import { createIPFindError } from './utils.js';

class APIRequest {
  readonly apiKey: string;

  constructor(_apiKey: string) {
    this.apiKey = _apiKey;
  }

  async makeRequest<T = any>(path: string, options?: RequestInit): Promise<T> {
    options = Object.assign({}, options, {
      headers: Object.assign({}, options?.headers, {
        "user-agent": "IPFindMCPServer/0.1.0",
      }),
    });

    const url = `https://api.ipfind.com${path}`;

    const res = await fetch(url, options);
    if (res.status >= 400) {
      throw await createIPFindError(res);
    }

    const contentType = res.headers.get("content-type");
    const result = contentType?.includes("application/json")
      ? await res.json()
      : await res.text();
    return result as T;
  }

  async getIPLocation(ip: string): Promise<IPFindIPResponse> {
    return await this.makeRequest<IPFindIPResponse>(
      `/?auth=${this.apiKey}&ip=${ip}`
    );
  }

  async getMyLocation(): Promise<IPFindIPResponse> {
    return await this.makeRequest<IPFindIPResponse>(`/me?auth=${this.apiKey}`);
  }

  async getAPIUsage(): Promise<IPFindUsageResponse> {
    return await this.makeRequest<IPFindUsageResponse>(
      `/usage?auth=${this.apiKey}`
    );
  }
}

export class IPFind {
  public apiRequest: APIRequest;

  constructor(apiKey: string) {
    this.apiRequest = new APIRequest(apiKey);
  }
}
