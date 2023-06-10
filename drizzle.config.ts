import "dotenv/config";
import type { Config } from "drizzle-kit";

const config: Config = {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  breakpoints: true,
  connectionString: process.env.DB_URL,
};

export default config;
