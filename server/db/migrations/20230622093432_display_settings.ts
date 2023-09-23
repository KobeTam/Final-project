import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("display_settings", (table) => {
    table.increments();
    table.integer("seq_group");
    table.integer("group_id").unsigned();
    table.foreign("group_id").references("groups.id");
    table.integer("seq_module");
    table.integer("module_id").unsigned();
    table.foreign("module_id").references("modules.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("display_settings");
}
