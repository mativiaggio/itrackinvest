export interface Crypto {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  price_usd: number;
  circulating_supply?: number; // Suministro circulante
  quote: {
    USD: {
      price: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      market_cap: number;
      market_cap_dominance: number;
    };
  };
}

export interface CryptosApiResponse {
  data: Crypto[];
  status: {
    error_code: number;
    error_message: string | null;
  };
}
