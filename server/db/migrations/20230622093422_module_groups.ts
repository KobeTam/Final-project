import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("module_groups", (table) => {
    table.increments();
    table.integer("module_id").unsigned();
    table.foreign("module_id").references("modules.id");
    table.integer("group_id").unsigned();
    table.foreign("group_id").references("groups.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("module_groups");
}
