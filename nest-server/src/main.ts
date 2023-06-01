import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let PORT = 3000;
  await app.listen(PORT);
  console.log(`listening on http://localhost:${3000}`);
}
bootstrap();
