import { IsString, IsOptional, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiPropertyOptional({ description: 'Название проекта' })
  @IsString()
  @IsOptional()
  name?: string;

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
