import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string): Promise<Project> {
    const project = this.projectRepository.create({
      ...createProjectDto,
      user: { id: userId } as any,
      data: createProjectDto.data || {
        sections: [],
      },
    });

    return this.projectRepository.save(project);
  }

  async findAll(userId: string): Promise<Project[]> {
    return this.projectRepository.find({
      where: { user: { id: userId } } as any,
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id, user: { id: userId } } as any,
      relations: ['user'],
    });

    if (!project) {
      throw new NotFoundException('Проект не найден');
    }

    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
  ): Promise<Project> {
    const project = await this.findOne(id, userId);

    Object.assign(project, updateProjectDto);
    project.data = {
      ...project.data,
      ...updateProjectDto.data,
      updatedAt: new Date(),
    };

    return this.projectRepository.save(project);
  }

  async publish(id: string, userId: string): Promise<Project> {
    const project = await this.findOne(id, userId);

    project.status = 'published';
    project.publishedUrl = `${process.env.PUBLISH_DOMAIN}/${project.id}`;
    project.data = {
      ...project.data,
      publishedAt: new Date(),
    };

    return this.projectRepository.save(project);
  }

  async unpublish(id: string, userId: string): Promise<Project> {
    const project = await this.findOne(id, userId);

    project.status = 'draft';
    project.publishedUrl = null;

    return this.projectRepository.save(project);
  }

  async remove(id: string, userId: string): Promise<void> {
    const project = await this.findOne(id, userId);
    await this.projectRepository.remove(project);
  }

  async archive(id: string, userId: string): Promise<Project> {
    const project = await this.findOne(id, userId);

    project.status = 'archived';
    return this.projectRepository.save(project);
  }

  async autoSave(
    id: string,
    data: Record<string, unknown>,
    userId: string,
  ): Promise<Project> {
    const project = await this.findOne(id, userId);

    project.data = {
      ...project.data,
      ...data,
      autoSavedAt: new Date(),
    };

    return this.projectRepository.save(project);
  }
}
