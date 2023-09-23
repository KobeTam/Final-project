import { config } from "dotenv";
import { resolve } from "path";
import populateEnv from "populate-env";

const envPath = resolve(__dirname, "../.env");
config({ path: envPath });

export let env = {
  DB_NAME: "cct",
  DB_USERNAME: "postgres",
  DB_PASSWORD: "postgres",
};

populateEnv(env, { mode: "halt" });
