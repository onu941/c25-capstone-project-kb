import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PartyroomModule } from './partyroom/partyroom.module';
import { KnexModule } from 'nestjs-knex';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserService } from './user/user.service';
import { BookingModule } from './booking/booking.module';
import { FileuploadController } from './fileupload/fileupload.controller';
import { FileuploadModule } from './fileupload/fileupload.module';
import { FileUploadService } from './file-upload/file-upload.service';
dotenv.config();

@Module({
  imports: [UserModule, PartyroomModule, AuthModule, BookingModule, FileuploadModule],
  controllers: [AppController, FileuploadController],
  providers: [AppService, JwtStrategy, UserService, FileUploadService],
})
export class AppModule {}
