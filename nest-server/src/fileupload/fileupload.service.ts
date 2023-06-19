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
    files: Array<Express.Multer.File>,
    formData: SubmitRoomDto,
  ) {
    console.log(files);
    console.log(formData);

    const trx = await this.knex.transaction(); // Start Knex transaction

    try {
      // Insert form data into 'table1' and get the 'id' value
      const [table1Id] = await trx('table1')
        .insert({
          column1: formData.price,
          column2: formData.title,
          // Add more columns as needed
        })
        .returning('id');

      // Insert form data into 'table2' using the obtained 'id' value
      const insertData = files.map((file) => ({
        table1id: table1Id,
        column3: file.filename,
        // Add more columns as needed
      }));
      await trx('table2').insert(insertData);

      // Commit the transaction if all operations succeed
      await trx.commit();

      // Handle file uploads if needed
      // ...

      console.log('Form data inserted successfully into PostgreSQL tables.');

      return { message: 'Partyroom successfully uploaded' };
    } catch (error) {
      // Rollback the transaction if an error occurs
      await trx.rollback();
      console.error('Error inserting form data into PostgreSQL tables:', error);
    } finally {
      // Release the transaction resources
      await trx.destroy();
    }
  }
}
