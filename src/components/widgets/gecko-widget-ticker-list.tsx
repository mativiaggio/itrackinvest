"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const coins = [
  { id: "bitcoin", name: "Bitcoin" },
  { id: "ethereum", name: "Ethereum" },
  { id: "tether", name: "Tether" },
  { id: "binancecoin", name: "Binance Coin" },
  { id: "usd-coin", name: "USD Coin" },
  { id: "ripple", name: "Ripple" },
  { id: "cardano", name: "Cardano" },
  { id: "solana", name: "Solana" },
  { id: "bitcoin-cash", name: "Bitcoin Cash" },
  { id: "uniswap", name: "Uniswap" },
  { id: "stellar", name: "Stellar" },
  { id: "binance-usd", name: "Binance USD" },
  { id: "monero", name: "Monero" },
  { id: "dai", name: "Dai" },
  { id: "crypto-com-coin", name: "Crypto.com Coin" },
  { id: "apecoin", name: "ApeCoin" },
  { id: "terra-luna", name: "Terra Luna" },
];

const MarketTickerWidget = () => {
  const { theme } = useTheme();
  const [coinId, setCoinId] = useState("bitcoin");
  const [widgetKey, setWidgetKey] = useState(0); 
  const [currentTheme, setCurrentTheme] = useState<string>("light");

  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://widgets.coingecko.com/gecko-coin-market-ticker-list-widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [widgetKey]); // Recarga el script cuando cambia widgetKey

  const handleChange = (value: string) => {
    setCoinId(value); // Cambia el coin-id
    setWidgetKey((prev) => prev + 1); // Actualiza la clave para forzar recreación
  };

  return (
    <div className="w-full h-full border light:border-[#eff2f5] dark:border-[#212d3b] p-4 rounded-md">
      {/* Select para cambiar el coin-id */}
      <Select onValueChange={handleChange} defaultValue="bitcoin">
        <SelectTrigger className="w-full border light:border-[#eff2f5] dark:border-[#212d3b]">
          <SelectValue placeholder="Select a coin" />
        </SelectTrigger>
        <SelectContent>
          {coins.map((coin) => (
            <SelectItem key={coin.id} value={coin.id}>
              {coin.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Widget */}
      <div key={widgetKey} className="mt-4">
        <gecko-coin-market-ticker-list-widget
          locale="en"
          outlined={false}
          dark-mode={currentTheme === "dark"}
          initial-currency="usd"
          transparent-background={true}
          coin-id={coinId}
        ></gecko-coin-market-ticker-list-widget>
      </div>
    </div>
  );
};

export default MarketTickerWidget;
