import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('projects')
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый проект' })
  @ApiResponse({ status: 201, description: 'Проект успешно создан' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  create(@Body() createProjectDto: CreateProjectDto, @Request() req: any) {
    return this.projectsService.create(createProjectDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все проекты пользователя' })
  @ApiResponse({ status: 200, description: 'Список проектов' })
  findAll(@Request() req: any) {
    return this.projectsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить проект по ID' })
  @ApiParam({ name: 'id', description: 'ID проекта' })
  @ApiResponse({ status: 200, description: 'Данные проекта' })
  @ApiResponse({ status: 404, description: 'Проект не найден' })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.projectsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить проект' })
  @ApiParam({ name: 'id', description: 'ID проекта' })
  @ApiResponse({ status: 200, description: 'Проект успешно обновлен' })
  @ApiResponse({ status: 404, description: 'Проект не найден' })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req: any,
  ) {
    return this.projectsService.update(id, updateProjectDto, req.user.id);
  }

  @Post(':id/publish')
  @ApiOperation({ summary: 'Опубликовать проект' })
  @ApiParam({ name: 'id', description: 'ID проекта' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Проект успешно опубликован' })
  publish(@Param('id') id: string, @Request() req: any) {
    return this.projectsService.publish(id, req.user.id);
  }

  @Post(':id/unpublish')
  @ApiOperation({ summary: 'Снять проект с публикации' })
  @ApiParam({ name: 'id', description: 'ID проекта' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Проект успешно снят с публикации' })
  unpublish(@Param('id') id: string, @Request() req: any) {
    return this.projectsService.unpublish(id, req.user.id);
  }

  @Post(':id/autosave')
  @ApiOperation({ summary: 'Автосохранение проекта' })
  @ApiParam({ name: 'id', description: 'ID проекта' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Проект успешно сохранен' })
  autoSave(
    @Param('id') id: string,
    @Body('data') data: Record<string, unknown>,
    @Request() req: any,
  ) {
    return this.projectsService.autoSave(id, data, req.user.id);
  }

  @Post(':id/archive')
  @ApiOperation({ summary: 'Архивировать проект' })
  @ApiParam({ name: 'id', description: 'ID проекта' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Проект успешно архивирован' })
  archive(@Param('id') id: string, @Request() req: any) {
    return this.projectsService.archive(id, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить проект' })
  @ApiParam({ name: 'id', description: 'ID проекта' })
  @ApiResponse({ status: 200, description: 'Проект успешно удален' })
  @ApiResponse({ status: 404, description: 'Проект не найден' })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.projectsService.remove(id, req.user.id);
  }
}
