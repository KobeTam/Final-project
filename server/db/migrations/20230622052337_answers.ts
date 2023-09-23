import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("answers", (table) => {
    table.increments();
    table.string("role", 64);
    table.text("content");
    table.integer("question_id").unsigned();
    table.foreign("question_id").references("questions.id");
    table.integer("token_used");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("answers");
}
