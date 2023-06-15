import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("fact_review", (table) => {
        table.increments("id");
        table.string("source");
    })

    await knex.schema.createTable("dim_review", (table) => {
        table.increments("id");
        table.integer("review_id").unsigned().references("fact_review.id");
        table.decimal("rating",3,1)
    })

    await knex.schema.table("fact_booking", (table) => {
        table.integer("rating").unsigned().references("dim_review.id")
    })

}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table("fact_booking",  (table) => {
        table.decimal("rating", 3, 1).unsigned();
    });
    await knex.schema.dropTable('dim_review');
    await knex.schema.dropTable('fact_review');
}

