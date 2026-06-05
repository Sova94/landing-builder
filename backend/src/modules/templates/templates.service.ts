import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {}

  async findAll(category?: string, tags?: string[]) {
    const query = this.templateRepository.createQueryBuilder('template');

    if (category) {
      query.andWhere('template.category = :category', { category });
    }

    if (tags && tags.length > 0) {
      query.andWhere('template.tags && :tags', { tags });
    }

    return query.getMany();
  }

  async findOne(id: string) {
    return this.templateRepository.findOne({ where: { id } });
  }

  async create(templateData: Partial<Template>): Promise<Template> {
    const template = this.templateRepository.create(templateData);
    return this.templateRepository.save(template);
  }

  async update(id: string, templateData: Partial<Template>): Promise<Template> {
    await this.templateRepository.update(id, templateData);
    return this.templateRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.templateRepository.delete(id);
  }

  async getPopular(limit = 10) {
    return this.templateRepository
      .createQueryBuilder('template')
      .orderBy('template.usageCount', 'DESC')
      .limit(limit)
      .getMany();
  }

  async getRecent(limit = 10) {
    return this.templateRepository
      .createQueryBuilder('template')
      .orderBy('template.createdAt', 'DESC')
      .limit(limit)
      .getMany();
  }

  async incrementUsage(id: string): Promise<void> {
    await this.templateRepository.increment({ id }, 'usageCount', 1);
  }
}
