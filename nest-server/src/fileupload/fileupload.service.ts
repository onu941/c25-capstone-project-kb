import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { SubmitRoomDto } from './dto/submit-room.dto';

@Injectable()
export class FileUploadService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async uploadFiles(
    imgFiles: Array<Express.Multer.File>,
    formData: SubmitRoomDto,
  ) {
    console.log(imgFiles);
    console.log(formData);

    const trx = await this.knex.transaction(); // Start Knex transaction

    try {
      // Insert form data into 'table1' and get the 'id' value
      const partyroomId = await trx('partyroom')
        .insert({
          name: formData.name,
          host_id: formData.host_id,
          district_id: formData.district,
          room_size: formData.room_size,
          capacity: formData.capacity,
          phone: formData.phone,
          address: formData.address,
          description: formData.description,
          is_hidden: false,
          // Add more columns as needed
        })
        .returning('id');

      // Insert form data into 'table2' using the obtained 'id' value
      const insertImages = imgFiles.map((file) => ({
        image_id: file.filename,
        // Add more columns as needed
      }));
      const [imageId] = await trx('image').insert(insertImages).returning('id');

      // Commit the transaction if all operations succeed
      await trx.commit();

      return { message: 'Partyroom successfully uploaded' };
    } catch (error) {
      await trx.rollback();
      console.error(error);
    }
  }
}
