import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { KnexModule } from "nestjs-knex";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
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
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
