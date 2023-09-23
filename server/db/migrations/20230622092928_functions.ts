import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("functions", (table) => {
    table.increments();
    table.string("name", 64);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("functions");
}
