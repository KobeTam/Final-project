import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("signs", (table) => {
    table.increments();
    table.string("name", 32).unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("signs");
}
