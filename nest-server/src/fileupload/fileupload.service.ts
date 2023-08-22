import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";
import { SubmitRoomDto } from "./dto/submit-room.dto";

@Injectable()
export class FileUploadService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async uploadFiles(formData: SubmitRoomDto) {
    const trx = await this.knex.transaction();

    try {
      const imageIdsQuery = await trx("image")
        .insert(formData.images.map((filename) => ({ filename })))
        .returning("id");

      const partyroomIdquery = await trx("partyroom")
        .insert({
          name: formData.name,
          host_id: formData.host_id,
          district_id: formData.district_id,
          room_size: formData.room_size,
          capacity: formData.capacity,
          phone: formData.phone,
          address: formData.address,
          description: formData.description,
          is_hidden: formData.is_hidden,
        })
        .returning("id");

      const partyroomId = partyroomIdquery[0].id;

      await trx("partyroom_category").insert(
        formData.category_id.map((category) => ({
          partyroom_id: partyroomId,
          category_id: category,
        }))
      );

      await trx("partyroom_equipment").insert(
        formData.equipment_id.map((equipment) => ({
          partyroom_id: partyroomId,
          equipment_id: equipment,
        }))
      );
      await trx("partyroom_price_list").insert(
        formData.price_list.map((price_list) => ({
          partyroom_id: partyroomId,
          headcount_price: price_list.headcount_price,
          is_holiday: price_list.is_holiday,
          start_time: price_list.start_time,
          total_hour: price_list.total_hour,
          base_room_fee: price_list.base_room_fee,
        }))
      );

      await trx("partyroom_image").insert(
        imageIdsQuery.map((img) => ({
          partyroom_id: partyroomId,
          image_id: img.id,
        }))
      );

      await trx.commit();
      return { message: "Partyroom successfully uploaded" };
    } catch (error) {
      await trx.rollback();
      console.error(error);
    }
  }
}
