import { IsString, IsOptional, IsObject, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Название проекта' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Описание проекта' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Данные проекта (секции, виджеты и т.д.)' })
  @IsObject()
  @IsOptional()
  data?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'SEO настройки' })
  @IsObject()
  @IsOptional()
  seo?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Настройки аналитики' })
  @IsObject()
  @IsOptional()
  analytics?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Дополнительные настройки' })
  @IsObject()
  @IsOptional()
  settings?: Record<string, unknown>;
}
