import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("first_name");
        table.string("last_name");
        table.string("email").unique();
        table.string("mobile_number").unique();
        table.string("password").unique();
        table.boolean("verified").defaultTo(false);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users");
}