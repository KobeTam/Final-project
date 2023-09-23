import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("question_signs", (table) => {
    table.increments();
    table.integer("question_id").unsigned();
    table.foreign("question_id").references("questions.id");
    table.integer("sign_id").unsigned();
    table.foreign("sign_id").references("signs.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("question_signs");
}
