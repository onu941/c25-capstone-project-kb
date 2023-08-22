import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import path from "path";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(path.resolve("uploads"));

  let PORT = 8080;
  await app.listen(PORT);
  console.log(`listening on http://localhost:${8080}`);
}
bootstrap();
