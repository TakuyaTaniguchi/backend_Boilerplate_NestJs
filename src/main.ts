import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { corsOptionsDelegate } from './core/core.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('The NestJS API description')
  .setVersion('1.0')
  .addTag('nestjs')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app,document)

  app.enableCors(corsOptionsDelegate);
  await app.listen(3000);
  app.useStaticAssets(join(__dirname, '../src', 'public'));
  app.setBaseViewsDir(join(__dirname, '../src', 'views'));
  app.setViewEngine('hbs');
}
bootstrap();
