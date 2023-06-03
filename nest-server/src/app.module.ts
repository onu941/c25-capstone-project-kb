import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PartyroomModule } from './partyroom/partyroom.module';
import { KnexModule } from 'nestjs-knex';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [UserModule, PartyroomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
