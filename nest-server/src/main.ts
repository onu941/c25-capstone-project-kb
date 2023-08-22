import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { multerConfig } from "./multer.config";
import { MulterModule } from "@nestjs/platform-express";
import path, { join } from "path";
import express from "express";
import { ValidationPipe } from "./validation/validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(path.resolve("uploads"));

  let PORT = 8080;
  await app.listen(PORT);
  console.log(`listening on http://localhost:${8080}`);
}
bootstrap();
