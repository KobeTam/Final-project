import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("question_tags", (table) => {
    table.increments();
    table.integer("question_id").unsigned();
    table.foreign("question_id").references("questions.id");
    table.integer("tag_id").unsigned();
    table.foreign("tag_id").references("tags.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("question_tags");
}
