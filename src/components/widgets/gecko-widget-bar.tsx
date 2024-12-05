"use client";
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from "react";

const GeckoCryptoWidgetBar = () => {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string>("light"); // Valor predeterminado: "light"

  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://widgets.coingecko.com/gecko-coin-price-marquee-widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <gecko-coin-price-marquee-widget
        locale="en"
        outlined={false}
        dark-mode={currentTheme === "dark"}
        transparent-background={true}
        coin-ids="bitcoin,ethereum,tether,binancecoin,usd-coin,ripple,cardano,solana, bitcoin-cash,uniswap,stellar,binance-usd,dai,crypto-com-coin,apecoin,terra-luna"
        initial-currency="usd"></gecko-coin-price-marquee-widget>
    </div>
  );
};

export default GeckoCryptoWidgetBar;
