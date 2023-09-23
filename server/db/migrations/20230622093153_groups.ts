import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("groups", (table) => {
    table.increments();
    table.integer("group_id");
    table.string("name", 64);
    table.integer("language_id").unsigned();
    table.foreign("language_id").references("languages.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("groups");
}
