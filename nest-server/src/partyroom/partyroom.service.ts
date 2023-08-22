import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePartyroomDto } from "./dto/create-partyroom.dto";
import { UpdatePartyroomDto } from "./dto/update-partyroom.dto";
import { InjectKnex } from "nestjs-knex";
import { Knex } from "knex";

@Injectable()
export class PartyroomService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async findRandomForLanding(id: number) {
    const query = await this.knex("partyroom")
      .select("partyroom.id", "image.filename")
      .join(
        "partyroom_image",
        "partyroom.id",
        "=",
        "partyroom_image.partyroom_id"
      )
      .join("image", "partyroom_image.image_id", "=", "image.id")
      .where("partyroom.host_id", "<>", id)
      .orderByRaw("RANDOM()")
      .limit(8);

    return query;
  }

  async findAllDistricts() {
    return await this.knex.select("*").from("district");
  }

  async findOne(id: number) {
    const query = await this.knex
      .select(
        "partyroom.*",
        "users.id",
        "users.name AS host_name",
        "district.name AS district"
      )
      .from("partyroom")
      .join("users", "partyroom.host_id", "=", "users.id")
      .join("district", "partyroom.district_id", "=", "district.id")
      .where("partyroom.id", id);

    if (!query) {
      throw new NotFoundException("partyroom not found");
    }
    return query;
  }

  async findCategoriesForOne(id: number) {
    try {
      const query = await this.knex
        .select("category.name")
        .from("partyroom")
        .join(
          "partyroom_category",
          "partyroom.id",
          "=",
          "partyroom_category.partyroom_id"
        )
        .join("category", "partyroom_category.category_id", "=", "category.id")
        .where("partyroom.id", id);

      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async findEquipmentForOne(id: number) {
    try {
      const query = await this.knex
        .select("equipment.name")
        .from("partyroom")
        .join(
          "partyroom_equipment",
          "partyroom.id",
          "=",
          "partyroom_equipment.partyroom_id"
        )
        .join(
          "equipment",
          "partyroom_equipment.equipment_id",
          "=",
          "equipment.id"
        )
        .where("partyroom.id", id);

      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async findPriceListsForOne(id: number) {
    try {
      const query = await this.knex
        .select(
          "partyroom_price_list.id AS database",
          "partyroom_price_list.headcount_price",
          "partyroom_price_list.is_holiday",
          "partyroom_price_list.start_time",
          "partyroom_price_list.total_hour",
          "partyroom_price_list.base_room_fee"
        )
        .from("partyroom_price_list")
        .where("partyroom_price_list.partyroom_id", id);

      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async findImagesOnNest(id: number) {
    if (!id) {
      throw new NotFoundException("No images found for this partyroom");
    }

    const query = await this.knex
      .select("image.filename")
      .from("partyroom_image")
      .join("image", "partyroom_image.image_id", "=", "image.id")
      .where("partyroom_image.partyroom_id", id)
      .orderBy("partyroom_image.id", "asc");

    return query;
  }

  async findByUserIdforSettings(id: number) {
    if (!id) {
      throw new NotFoundException("No partyrooms found for the given user ID");
    }

    const userPartyrooms = await this.knex
      .table("partyroom")
      .select("id", "name", "address")
      .where("host_id", id)
      .orderBy("id", "asc");
    return userPartyrooms;
  }

  async findAllReviewsForOne(partyroom_id: number) {
    if (!partyroom_id) {
      throw new NotFoundException("check your partyroom id");
    }

    try {
      const query = await this.knex
        .select(
          "review.id",
          "review.booking_info_id",
          "review.rating",
          "review.detail",
          "booking_info.id AS booking_info_id",
          "booking_info.booking_users_id",
          "booking_info.partyroom_price_list_id",
          "partyroom_price_list.id AS partyroom_price_list_id",
          "partyroom_price_list.partyroom_id",
          "users.id AS users_id",
          "users.name"
        )
        .from("review")
        .join("booking_info", "review.booking_info_id", "=", "booking_info.id")
        .join(
          "partyroom_price_list",
          "booking_info.partyroom_price_list_id",
          "=",
          "partyroom_price_list.id"
        )
        .join("users", "booking_info.booking_users_id", "=", "users.id")
        .where("partyroom_price_list.partyroom_id", partyroom_id)
        .where("review.is_hidden", false);

      return query;
    } catch (error) {
      console.log(error);
    }
  }

  async searchByDistrict(districtId: number) {
    try {
      const query = await this.knex
        .select(
          "partyroom.id AS partyroom_id",
          "partyroom.name",
          "partyroom.address",
          "partyroom.district_id",
          "partyroom.capacity",
          "image.filename"
        )
        .distinctOn("partyroom.id")
        .from("partyroom")
        .join(
          "partyroom_image",
          "partyroom.id",
          "=",
          "partyroom_image.partyroom_id"
        )
        .join("image", "partyroom_image.image_id", "=", "image.id")
        .where("partyroom.district_id", districtId)
        .andWhere("partyroom.is_hidden", false);

      return query;
    } catch (error) {
      console.log(error);
    }
  }
}
