import {
  IsString,
  IsOptional,
  IsObject,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTemplateDto {
  @ApiPropertyOptional({ description: 'Название шаблона' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Описание шаблона' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Категория шаблона' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'URL превью' })
  @IsString()
  @IsOptional()
  preview?: string;

  @ApiPropertyOptional({ description: 'Данные проекта' })
  @IsObject()
  @IsOptional()
  project?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Теги шаблона' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ description: 'Автор шаблона' })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional({ description: 'Статус публикации' })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
