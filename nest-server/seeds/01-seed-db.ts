import { Knex } from 'knex';
import { hashPassword } from '../src/user/hash';
import {
  bookingInfoSeed,
  categorySeed,
  districtSeed,
  equipmentSeed,
  imageSeed,
  partyroomCategorySeed,
  partyroomEquipmentSeed,
  partyroomImageSeed,
  partyroomPriceListSeed,
  partyroomSeed,
  reviewSeed,
  usersSeed,
} from '../data/data';

export async function seed(knex: Knex): Promise<void> {
  try {
    const hashedUsers = await Promise.all(
      usersSeed.map(async (user) => {
        const hashedPassword = await hashPassword(user.password);
        return { ...user, password: hashedPassword };
      }),
    );

    await knex('image').insert(imageSeed());
    await knex('district').insert(districtSeed());
    await knex('users').insert(hashedUsers);
    await knex('partyroom').insert(partyroomSeed());
    await knex('partyroom_image').insert(partyroomImageSeed());
    await knex('category').insert(categorySeed);
    await knex('partyroom_category').insert(partyroomCategorySeed);
    await knex('equipment').insert(equipmentSeed);
    await knex('partyroom_equipment').insert(partyroomEquipmentSeed);
    await knex('partyroom_price_list').insert(partyroomPriceListSeed);
    await knex('booking_info').insert(bookingInfoSeed());
    await knex('review').insert(reviewSeed());
  } catch (error) {
    console.log(error);
  }
}
