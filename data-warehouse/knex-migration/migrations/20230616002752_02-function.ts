import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.raw(`
        CREATE OR REPLACE FUNCTION update_dim_partyroom_equipment_end_date() RETURNS TRIGGER AS $$
        BEGIN
          UPDATE dim_partyroom_equipment
          SET end_date = NEW.start_date
          WHERE end_date IS NULL
            AND start_date <= NEW.start_date
            AND partyroom_id = NEW.partyroom_id;

          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `)

    knex.schema.raw(`
        CREATE TRIGGER update_dim_partyroom_equipment_end_date_trigger
        AFTER INSERT ON dim_partyroom_equipment
        FOR EACH ROW
        EXECUTE FUNCTION update_dim_partyroom_equipment_end_date();
    `)

    knex.schema.raw(`
        CREATE OR REPLACE FUNCTION update_dim_partyroom_category_end_date() RETURNS TRIGGER AS $$
        BEGIN
          UPDATE dim_partyroom_category
          SET end_date = NEW.start_date
          WHERE end_date IS NULL
            AND start_date <= NEW.start_date
            AND partyroom_id = NEW.partyroom_id;

          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `)

    knex.schema.raw(`
        CREATE TRIGGER update_dim_partyroom_category_end_date_trigger
        AFTER INSERT ON dim_partyroom_category
        FOR EACH ROW
        EXECUTE FUNCTION update_dim_partyroom_category_end_date();
    `)

    knex.schema.raw(`
        CREATE OR REPLACE FUNCTION update_partyroom_avg_rating() RETURNS TRIGGER AS $$
        BEGIN
          UPDATE fact_partyroom_register
          SET avg_rating = (
            SELECT AVG(rating) 
            FROM dim_review 
            INNER JOIN fact_booking ON fact_booking.review_rating = dim_review.id
            INNER JOIN dim_partyroom ON fact_booking.partyroom_id = dim_partyroom.id
            WHERE dim_partyroom.partyroom_register_id = NEW.partyroom_register_id
          )
          WHERE id = (
            SELECT id 
            FROM fact_partyroom_register
            WHERE partyroom_register_id = NEW.partyroom_register_id
          );
        
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `)

    knex.schema.raw(`
        CREATE TRIGGER update_partyroom_avg_rating_trigger
        AFTER UPDATE ON dim_review
        FOR EACH ROW
        EXECUTE FUNCTION update_partyroom_avg_rating();
    `)
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.raw('DROP TRIGGER update_partyroom_avg_rating_trigger ON dim_review')
    await knex.schema.raw('DROP FUNCTION update_partyroom_avg_rating')
    await knex.schema.raw('DROP TRIGGER update_dim_partyroom_category_end_date_trigger ON dim_partyroom_category')
    await knex.schema.raw('DROP FUNCTION update_dim_partyroom_category_end_date')
    await knex.schema.raw('DROP TRIGGER update_dim_partyroom_equipment_end_date_trigger ON dim_partyroom_equipment')
    await knex.schema.raw('DROP FUNCTION update_dim_partyroom_equipment_end_date')
}

