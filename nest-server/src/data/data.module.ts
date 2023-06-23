import { Module } from "@nestjs/common";
import { DataController } from "./data.controller";
import { DataService } from "./data.service";
import { AuthModule } from "src/auth/auth.module";
import { KnexModule } from "nestjs-knex";

@Module({
  imports: [
    AuthModule,
    KnexModule.forRootAsync({
      useFactory: async () => ({
        config: {
          client: "pg",
          connection: {
            host: process.env.DB_HOST,
            port: 5432,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          },
        },
      }),
    }),
  ],
  controllers: [DataController],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
