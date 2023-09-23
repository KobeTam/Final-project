import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("languages", (table) => {
    table.increments();
    table.string("name", 32);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("languages");
}
