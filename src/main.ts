import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Kraken Trading Bot API')
    .setDescription('API documentation for the Kraken Trading Bot')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('Kraken')
    .addTag('Bot')
    .addTag('Trades')
    .addApiKey({ type: 'apiKey', in: 'header', name: 'user-id' }, 'user-id')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Serve Swagger UI static files
  app.useStaticAssets(join(__dirname, 'swagger-ui'), {
    prefix: '/swagger-ui',
  });
  
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`API Documentation available at: http://localhost:${port}/api`);
}

bootstrap();