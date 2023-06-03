import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { KnexModule } from 'nestjs-knex';

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
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
