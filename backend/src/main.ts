import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Глобальная валидация
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  
  // CORS
  const corsOrigins = process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
    : ['http://localhost:3000'];
  
  app.enableCors({
    origin: function(origin, callback) {
      // Разрешить запросы без origin (мобильные приложения, curl)
      if (!origin) return callback(null, true);
      
      if (corsOrigins.indexOf(origin) !== -1 || origin.includes('vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
  
  // Swagger документация
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Landing Builder API')
      .setDescription('API для конструктора лендингов')
      .setVersion('1.0')
      .addTag('projects', 'Проекты')
      .addTag('widgets', 'Виджеты')
      .addTag('auth', 'Аутентификация')
      .addTag('publish', 'Публикация')
      .addTag('templates', 'Шаблоны')
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  
  const port = process.env.PORT || 4000;
  await app.listen(port);
  
  console.log(`Backend running on http://localhost:${port}`);
  console.log(`API documentation: http://localhost:${port}/api`);
}

bootstrap();
