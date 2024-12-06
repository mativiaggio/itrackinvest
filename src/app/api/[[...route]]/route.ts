import auth from "@/features/auth/server/route";
import users from "@/features/users/server/route";
import tickets from "@/features/ticketing-system/server/route";
import crypto from "@/features/crypto/server/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";
const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", auth)
  .route("/users", users)
  .route("/tickets", tickets)
  .route("/crypto", crypto);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);

export type AppType = typeof routes;
