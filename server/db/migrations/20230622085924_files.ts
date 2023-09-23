import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("files", (table) => {
    table.increments();
    table.string("filename", 255);
    table.string("filetype", 16);
    table.integer("question_id").unsigned();
    table.foreign("question_id").references("questions.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("files");
}
