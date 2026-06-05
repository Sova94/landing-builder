import { Controller, Post, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PublishService } from './publish.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('publish')
@Controller('publish')
@UseGuards(JwtAuthGuard)
export class PublishController {
  constructor(private readonly publishService: PublishService) {}

  @Post(':id')
  @ApiOperation({ summary: 'Опубликовать проект' })
  @ApiParam({ name: 'id', description: 'ID проекта' })
  @ApiResponse({ status: 200, description: 'Проект успешно опубликован' })
  @ApiResponse({ status: 404, description: 'Проект не найден' })
  publish(@Param('id') id: string) {
    return this.publishService.publishProject(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить опубликованный проект' })
  @ApiParam({ name: 'id', description: 'ID проекта' })
  @ApiResponse({ status: 200, description: 'HTML содержимое проекта' })
  @ApiResponse({ status: 404, description: 'Проект не опубликован' })
  getPublished(@Param('id') id: string) {
    return this.publishService.getPublishedProject(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Снять проект с публикации' })
  @ApiParam({ name: 'id', description: 'ID проекта' })
  @ApiResponse({ status: 200, description: 'Проект успешно снят с публикации' })
  unpublish(@Param('id') id: string) {
    return this.publishService.unpublishProject(id);
  }
}
