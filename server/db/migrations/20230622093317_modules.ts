import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("modules", (table) => {
    table.increments();
    table.string("title");
    table.text("description");
    table.integer("function_id").unsigned();
    table.foreign("function_id").references("functions.id");
    table.integer("prompt_id").unsigned();
    table.foreign("prompt_id").references("prompts.id");
    table.integer("language_id").unsigned();
    table.foreign("language_id").references("languages.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("modules");
}
