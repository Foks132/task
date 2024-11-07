import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT;
  console.log(
    `Launching NestJS app on port ${port}, URL: http://localhost:${port}`,
  );
  await app.listen(port);
}
bootstrap();
