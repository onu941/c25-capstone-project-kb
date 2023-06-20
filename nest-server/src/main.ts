import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { multerConfig } from './multer.config';
import { MulterModule } from '@nestjs/platform-express';
import path, { join } from 'path';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(path.resolve('uploads'));

  let PORT = 3000;
  await app.listen(PORT);
  console.log(`listening on http://localhost:${3000}`);
}
bootstrap();
