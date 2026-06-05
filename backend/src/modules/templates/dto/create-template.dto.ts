import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTemplateDto {
  @ApiProperty({ description: 'Название шаблона' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Описание шаблона' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Категория шаблона' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'URL превью' })
  @IsString()
  @IsNotEmpty()
  preview: string;

  @ApiProperty({ description: 'Данные проекта' })
  @IsObject()
  @IsNotEmpty()
  project: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Теги шаблона' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ description: 'Автор шаблона' })
  @IsString()
  @IsOptional()
  author?: string;
}
