import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin:[process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.get(ThrottlerGuard)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
