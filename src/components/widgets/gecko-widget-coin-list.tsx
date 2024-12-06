"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const CryptoTickerListWidget = () => {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string>("light"); // Valor predeterminado: "light"

  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.coingecko.com/gecko-coin-list-widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full h-full border light:border-[#eff2f5] dark:border-[#212d3b] p-4 rounded-md">
      <gecko-coin-list-widget
        locale="en"
        outlined={false}
        dark-mode={currentTheme === "dark"} // Adapta el modo oscuro dinámicamente
        transparent-background={true}
        coin-ids="bitcoin,ethereum,tether,binancecoin,usd-coin,ripple,cardano,solana,bitcoin-cash,uniswap,stellar,binance-usd,monero,dai,crypto-com-coin,apecoin,terra-luna"
        initial-currency="usd"
      ></gecko-coin-list-widget>
    </div>
  );
};

export default CryptoTickerListWidget;
