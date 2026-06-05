import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@ApiTags('templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все шаблоны' })
  @ApiQuery({ name: 'category', required: false, description: 'Фильтр по категории' })
  @ApiQuery({ name: 'tags', required: false, description: 'Фильтр по тегам (через запятую)' })
  findAll(
    @Query('category') category?: string,
    @Query('tags') tags?: string,
  ) {
    const tagsArray = tags ? tags.split(',').map(t => t.trim()) : undefined;
    return this.templatesService.findAll(category, tagsArray);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Получить популярные шаблоны' })
  getPopular(@Query('limit') limit = '10') {
    return this.templatesService.getPopular(parseInt(limit));
  }

  @Get('recent')
  @ApiOperation({ summary: 'Получить последние шаблоны' })
  getRecent(@Query('limit') limit = '10') {
    return this.templatesService.getRecent(parseInt(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить шаблон по ID' })
  @ApiParam({ name: 'id', description: 'ID шаблона' })
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать шаблон' })
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
  }

  @Post(':id/use')
  @ApiOperation({ summary: 'Использовать шаблон' })
  @ApiParam({ name: 'id', description: 'ID шаблона' })
  async useTemplate(@Param('id') id: string) {
    await this.templatesService.incrementUsage(id);
    return { success: true };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить шаблон' })
  @ApiParam({ name: 'id', description: 'ID шаблона' })
  update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templatesService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить шаблон' })
  @ApiParam({ name: 'id', description: 'ID шаблона' })
  remove(@Param('id') id: string) {
    return this.templatesService.remove(id);
  }
}
