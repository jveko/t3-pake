import "dotenv/config";
import type { Config } from "drizzle-kit";

const config: Config = {
  schema: "./src/server/db/schema.ts",
  out:"./drizzle",
  connectionString: process.env.DB_URL,
};

export default config;
