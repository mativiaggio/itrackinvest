import { client } from "@/lib/rpc";
import { CryptosApiResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCryptos = () => {
  return useQuery<CryptosApiResponse, Error>({
    queryKey: ["crypto"],
    queryFn: async () => {
      const response = await client.api.crypto.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch crypto data");
      }

      const body: CryptosApiResponse = await response.json();

      if (body.status.error_code !== 0) {
        throw new Error(body.status.error_message || "Unknown error");
      }

      return body;
    },
  });
};
