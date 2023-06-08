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
dotenv.config();

@Module({
  imports: [
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
    ,
    UserModule,
    PartyroomModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
