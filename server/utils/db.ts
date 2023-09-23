import Knex from "knex";
const knexConfig = require("../db/knexfile");
export const db = Knex(knexConfig[process.env.NODE_ENV || "development"]);

let profile = knexConfig.development;
export let knex = Knex(profile);
