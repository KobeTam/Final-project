import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("transactions", (table) => {
    table.increments();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
    table.integer("opening_bal");
    table.integer("change");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("transactions");
}
