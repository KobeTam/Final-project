import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("prompts", (table) => {
    table.increments();
    table.integer("seq");
    table.string("role", 16);
    table.text("content");
    table.integer("language_id").unsigned();
    table.foreign("language_id").references("languages.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("prompts");
}
