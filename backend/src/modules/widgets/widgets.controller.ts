import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { WidgetsService } from './widgets.service';

@ApiTags('widgets')
@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все виджеты' })
  getAll() {
    return this.widgetsService.getAllWidgets();
  }

  @Get('categories')
  @ApiOperation({ summary: 'Получить все категории виджетов' })
  getCategories() {
    return this.widgetsService.getCategories();
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Получить виджеты по категории' })
  @ApiParam({ name: 'category', description: 'Название категории' })
  getByCategory(@Param('category') category: string) {
    return this.widgetsService.getWidgetsByCategory(category);
  }

  @Get(':type')
  @ApiOperation({ summary: 'Получить виджет по типу' })
  @ApiParam({ name: 'type', description: 'Тип виджета' })
  getByType(@Param('type') type: string) {
    return this.widgetsService.getWidgetByType(type);
  }
}
