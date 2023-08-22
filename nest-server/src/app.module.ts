import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { PartyroomModule } from "./partyroom/partyroom.module";
import { AuthModule } from "./auth/auth.module";
import * as dotenv from "dotenv";
import { JwtStrategy } from "./auth/jwt.strategy";
import { UserService } from "./user/user.service";
import { BookingModule } from "./booking/booking.module";
import { FileUploadController } from "./fileupload/fileupload.controller";
import { FileUploadModule } from "./fileupload/fileupload.module";
import { FileUploadService } from "./fileupload/fileupload.service";
import { join } from "path";
import { DataModule } from "./data/data.module";
dotenv.config();

@Module({
  imports: [
    DataModule,
    UserModule,
    PartyroomModule,
    AuthModule,
    BookingModule,
    FileUploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),
    DataModule,
  ],
  controllers: [AppController, FileUploadController],
  providers: [AppService, JwtStrategy, UserService, FileUploadService],
})
export class AppModule {}
