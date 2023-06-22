import { Module } from '@nestjs/common';
import { PartyroomService } from './partyroom.service';
import { PartyroomController } from './partyroom.controller';
import { AuthModule } from 'src/auth/auth.module';
import { KnexModule } from 'nestjs-knex';

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
  controllers: [PartyroomController],
  providers: [PartyroomService],
  exports: [PartyroomService],
})
export class PartyroomModule {}
