import { Module } from '@nestjs/common';
import { FileUploadService } from './fileupload.service';
import { FileUploadController } from './fileupload.controller';
import { KnexModule } from 'nestjs-knex';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    KnexModule.forRootAsync({
      useFactory: async () => ({
        config: {
          client: 'pg',
          connection: {
            host: 'localhost',
            port: 5432,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          },
        },
      }),
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
