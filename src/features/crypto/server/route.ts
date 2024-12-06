import { env } from "@/env.config";
import { sessionMiddleware } from "@/lib/session-middlware";
import { Hono } from "hono";

const app = new Hono().get("/", sessionMiddleware, async (c) => {
  try {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": env.CMC_API_KEY,
        },
      }
    );

    if (!response.ok) {
      return c.json({ error: "Failed to fetch data from CoinMarketCap" }, 500);
    }

    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Something went wrong" }, 500);
  }
});

export default app;
