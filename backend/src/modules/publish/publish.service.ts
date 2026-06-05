import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class PublishService {
  private readonly PUBLISH_DIR = process.env.PUBLISH_DIR || './public';

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async publishProject(projectId: string): Promise<string> {
    const project = await this.projectRepository.findOne({ where: { id: projectId } });
    
    if (!project) {
      throw new NotFoundException('Проект не найден');
    }

    // Создание директории для проекта
    const projectDir = path.join(this.PUBLISH_DIR, projectId);
    
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    // Генерация HTML
    const html = this.generateHTML(project);
    const htmlPath = path.join(projectDir, 'index.html');
    fs.writeFileSync(htmlPath, html);

    // Копирование CSS и JS
    this.generateCSS(project, projectDir);
    this.generateJS(project, projectDir);

    return `/published/${projectId}`;
  }

  async getPublishedProject(projectId: string): Promise<string> {
    const projectPath = path.join(this.PUBLISH_DIR, projectId, 'index.html');
    
    if (!fs.existsSync(projectPath)) {
      throw new NotFoundException('Опубликованный проект не найден');
    }

    return fs.readFileSync(projectPath, 'utf-8');
  }

  async unpublishProject(projectId: string): Promise<void> {
    const projectDir = path.join(this.PUBLISH_DIR, projectId);
    
    if (fs.existsSync(projectDir)) {
      fs.rmSync(projectDir, { recursive: true, force: true });
    }
  }

  private generateHTML(project: Project): string {
    const template = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{seo.title}}</title>
  <meta name="description" content="{{seo.description}}">
  <meta name="keywords" content="{{seo.keywords}}">
  {{#if seo.ogImage}}
  <meta property="og:image" content="{{seo.ogImage}}">
  {{/if}}
  <link rel="stylesheet" href="styles.css">
  {{#if settings.customCode.head}}
  {{{settings.customCode.head}}}
  {{/if}}
</head>
<body>
  {{{renderedSections}}}
  
  <script src="main.js"></script>
  {{#if settings.customCode.body}}
  {{{settings.customCode.body}}}
  {{/if}}
  {{#if analytics.googleAnalytics.enabled}}
  <script async src="https://www.googletagmanager.com/gtag/js?id={{analytics.googleAnalytics.trackingId}}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '{{analytics.googleAnalytics.trackingId}}');
  </script>
  {{/if}}
</body>
</html>
    `;

    const compiledTemplate = handlebars.compile(template);
    const renderedSections = this.renderSections(project.data.sections || []);

    return compiledTemplate({
      seo: project.seo || {},
      settings: project.settings || {},
      analytics: project.analytics || {},
      renderedSections,
    });
  }

  private renderSections(sections: any[]): string {
    return sections.map(section => {
      let html = `<section class="section" style="${this.renderStyle(section.style)}">`;
      
      if (section.widgets) {
        html += section.widgets.map(widget => this.renderWidget(widget)).join('');
      }
      
      html += '</section>';
      return html;
    }).join('');
  }

  private renderWidget(widget: any): string {
    const { type, content, style } = widget;

    switch (type) {
      case 'heading':
        return `<${content.level || 'h1'} style="${this.renderStyle(style)}">${content.text}</${content.level || 'h1'}>`;
      
      case 'paragraph':
        return `<p style="${this.renderStyle(style)}">${content.text}</p>`;
      
      case 'button':
        return `<a href="${content.url || '#'}" class="button" style="${this.renderStyle(style)}">${content.text}</a>`;
      
      case 'hero':
        return `
          <div class="hero" style="background-image: url('${style.backgroundImage?.url}'); ${this.renderStyle(style)}">
            <h1>${content.title}</h1>
            <p>${content.subtitle}</p>
            ${content.buttons?.map((btn: any) => 
              `<a href="${btn.url}" class="button ${btn.variant}">${btn.text}</a>`
            ).join('')}
          </div>
        `;
      
      default:
        return `<div data-widget-type="${type}" style="${this.renderStyle(style)}">${JSON.stringify(content)}</div>`;
    }
  }

  private renderStyle(style: any): string {
    if (!style) return '';
    
    const styles: string[] = [];
    
    if (style.colors?.background) {
      styles.push(`background-color: ${style.colors.background}`);
    }
    
    if (style.colors?.text) {
      styles.push(`color: ${style.colors.text}`);
    }
    
    if (style.spacing?.padding) {
      styles.push(`padding: ${style.spacing.padding}`);
    }
    
    if (style.spacing?.margin) {
      styles.push(`margin: ${style.spacing.margin}`);
    }
    
    if (style.typography?.fontSize) {
      styles.push(`font-size: ${style.typography.fontSize}`);
    }
    
    if (style.typography?.textAlign) {
      styles.push(`text-align: ${style.typography.textAlign}`);
    }
    
    return styles.join('; ');
  }

  private generateCSS(project: Project, projectDir: string): void {
    const css = `
/* Основные стили */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  line-height: 1.6;
}

.section {
  width: 100%;
  position: relative;
}

.button {
  display: inline-block;
  padding: 12px 32px;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.hero {
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
}

.hero h1 {
  font-size: 56px;
  margin-bottom: 24px;
}

.hero p {
  font-size: 20px;
  margin-bottom: 32px;
}
    `;

    fs.writeFileSync(path.join(projectDir, 'styles.css'), css);
  }

  private generateJS(project: Project, projectDir: string): void {
    const js = `
// Основной JavaScript для опубликованного проекта
console.log('Landing page loaded');

// Инициализация виджетов
document.addEventListener('DOMContentLoaded', () => {
  // Аккордеон
  document.querySelectorAll('details').forEach(details => {
    details.addEventListener('toggle', () => {
      // Обработка открытия/закрытия
    });
  });

  // Слайдер
  // ... реализация слайдера

  // Формы
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Обработка отправки формы
    });
  });
});
    `;

    fs.writeFileSync(path.join(projectDir, 'main.js'), js);
  }
}
