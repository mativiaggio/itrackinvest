"use client";
import { useGetCryptos } from "../api/use-get-cryptos";
import { CryptosDataTable } from "./cryptos-data-table";

export default function CryptosDataContainer() {
  const { data } = useGetCryptos();
  return <CryptosDataTable cryptosData={data} />;
}
