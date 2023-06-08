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
dotenv.config();

@Module({
  imports: [UserModule, PartyroomModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, UserService],
})
export class AppModule {}
