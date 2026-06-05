import React from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';
import { FileText, ExternalLink } from 'lucide-react';

interface PageListWidgetProps {
  widget: WidgetData;
}

export const PageListWidget: React.FC<PageListWidgetProps> = ({ widget }) => {
  const { content, style } = widget;
  const title = content.title || 'Страницы';
  const pages = content.pages || [
    { title: 'Главная', url: '#', description: 'Основная страница сайта' },
    { title: 'О компании', url: '#about', description: 'Информация о нашей компании' },
    { title: 'Услуги', url: '#services', description: 'Наши услуги и предложения' },
    { title: 'Контакты', url: '#contact', description: 'Свяжитесь с нами' },
  ];
  const layout = content.layout || 'list';
  const columns = content.columns || 2;
  const showIcons = content.showIcons !== false;
  const showDescriptions = content.showDescriptions !== false;

  return (
    <div
      className="w-full py-12 px-4"
      style={style}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{title}</h2>
        )}

        {layout === 'list' ? (
          <div className="space-y-4">
            {pages.map((page: any, index: number) => (
              <a
                key={index}
                href={page.url}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow group"
              >
                {showIcons && (
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    {page.icon ? (
                      <span className="text-2xl">{page.icon}</span>
                    ) : (
                      <FileText className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {page.title}
                    </h3>
                    {page.external && <ExternalLink className="w-4 h-4 text-gray-400" />}
                  </div>
                  {showDescriptions && page.description && (
                    <p className="text-gray-600 text-sm mt-1">{page.description}</p>
                  )}
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </a>
            ))}
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {pages.map((page: any, index: number) => (
              <a
                key={index}
                href={page.url}
                className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow group"
              >
                {showIcons && (
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    {page.icon ? (
                      <span className="text-2xl">{page.icon}</span>
                    ) : (
                      <FileText className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {page.title}
                  </h3>
                  {page.external && <ExternalLink className="w-4 h-4 text-gray-400" />}
                </div>
                {showDescriptions && page.description && (
                  <p className="text-gray-600 text-sm">{page.description}</p>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const pageListWidgetConfig = {
  type: 'pageList' as WidgetType,
  name: 'Список страниц',
  icon: 'FileText',
  category: 'Навигация',
  defaultData: {
    id: '',
    type: 'pageList' as WidgetType,
    name: 'Список страниц',
    content: {
      title: 'Страницы',
      pages: [
        { title: 'Главная', url: '#', description: 'Основная страница сайта' },
        { title: 'О компании', url: '#about', description: 'Информация о нашей компании' },
        { title: 'Услуги', url: '#services', description: 'Наши услуги и предложения' },
        { title: 'Контакты', url: '#contact', description: 'Свяжитесь с нами' },
      ],
      layout: 'list',
      columns: 2,
      showIcons: true,
      showDescriptions: true,
    },
    style: {
      backgroundColor: '#f9fafb',
      padding: '60px 20px',
    },
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    position: {
      x: 50,
      y: 50,
      width: 800,
      height: 500,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      title: { type: 'text', label: 'Заголовок' },
      pages: { type: 'array', label: 'Страницы' },
      layout: {
        type: 'select',
        label: 'Макет',
        options: [
          { value: 'list', label: 'Список' },
          { value: 'grid', label: 'Сетка' },
        ],
      },
      columns: {
        type: 'select',
        label: 'Колонки',
        options: [
          { value: 2, label: '2' },
          { value: 3, label: '3' },
          { value: 4, label: '4' },
        ],
      },
      showIcons: { type: 'boolean', label: 'Показывать иконки' },
      showDescriptions: { type: 'boolean', label: 'Показывать описания' },
    },
  },
};
