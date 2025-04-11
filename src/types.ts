
export type IPFindIPResponse = {
    ip_address: string;
    country: string | null;
    country_code: string | null;
    continent: string | null;
    continent_code: string | null;
    city: string | null;
    county: string | null;
    region: string | null;
    region_code: string | null;
    postal_code: string | null;
    timezone: string | null;
    owner: string | null;
    longitude: number;
    latitude: number;
    currency: string | null;
    languages: string[];
};

export type IPFindUsageResponse = {
    request_count: number;
    daily_request_limit: number;
    remaining: number;
};

