import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("questions", (table) => {
    table.increments();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
    table.text("content");
    table.integer("token_used");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("questions");
}
