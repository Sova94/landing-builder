import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './modules/projects/projects.module';
import { WidgetsModule } from './modules/widgets/widgets.module';
import { AuthModule } from './modules/auth/auth.module';
import { PublishModule } from './modules/publish/publish.module';
import { TemplatesModule } from './modules/templates/templates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'landing_builder',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
    }),
    ProjectsModule,
    WidgetsModule,
    AuthModule,
    PublishModule,
    TemplatesModule,
  ],
})
export class AppModule {}
