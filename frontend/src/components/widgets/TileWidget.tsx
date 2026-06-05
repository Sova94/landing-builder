import React from 'react';
import type { WidgetData, WidgetType } from '@types/index';
import { ArrowRight } from 'lucide-react';

interface TileWidgetProps {
  widget: WidgetData;
  isPreview?: boolean;
}

export const TileWidget: React.FC<TileWidgetProps> = ({ widget, isPreview = false }) => {
  const { content, style } = widget;
  const tiles = content.tiles || [
    { title: 'Плитка 1', subtitle: 'Описание', image: '', url: '#', color: '#3b82f6' },
    { title: 'Плитка 2', subtitle: 'Описание', image: '', url: '#', color: '#8b5cf6' },
    { title: 'Плитка 3', subtitle: 'Описание', image: '', url: '#', color: '#ec4899' },
    { title: 'Плитка 4', subtitle: 'Описание', image: '', url: '#', color: '#14b8a6' },
  ];
  const layout = content.layout || 'grid';
  const aspectRatio = content.aspectRatio || 'square';

  const aspectRatioClasses: Record<string, string> = {
    'square': 'aspect-square',
    'video': 'aspect-video',
    'portrait': 'aspect-[3/4]',
    'landscape': 'aspect-[4/3]',
  };

  return (
    <div
      className="w-full py-8 px-4"
      style={style}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      <div className="max-w-6xl mx-auto">
        {layout === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tiles.map((tile: any, index: number) => (
              <a
                key={index}
                href={tile.url}
                className={`group relative overflow-hidden rounded-xl ${aspectRatioClasses[aspectRatio] || 'aspect-square'}`}
              >
                {/* Фон */}
                {tile.image ? (
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: tile.color || '#3b82f6' }}
                  />
                )}

                {/* Затемнение */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Контент */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform">
                    {tile.title}
                  </h3>
                  {tile.subtitle && (
                    <p className="text-white/80 text-sm mb-3">{tile.subtitle}</p>
                  )}
                  <div className="flex items-center text-white/90 text-sm font-medium">
                    <span>Подробнее</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {tiles.map((tile: any, index: number) => (
              <a
                key={index}
                href={tile.url}
                className={`group relative overflow-hidden rounded-2xl ${aspectRatioClasses[aspectRatio] || 'aspect-video'}`}
              >
                {tile.image ? (
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: tile.color || '#3b82f6' }}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">{tile.title}</h3>
                  {tile.subtitle && (
                    <p className="text-white/80 mb-4">{tile.subtitle}</p>
                  )}
                  <div className="flex items-center text-white font-medium">
                    <span>Перейти</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const tileWidgetConfig = {
  type: 'tile' as WidgetType,
  name: 'Плитка и ссылка',
  icon: 'LayoutGrid',
  category: 'Навигация',
  defaultData: {
    id: '',
    type: 'tile' as WidgetType,
    name: 'Плитка',
    content: {
      tiles: [
        { title: 'Плитка 1', subtitle: 'Описание', image: '', url: '#', color: '#3b82f6' },
        { title: 'Плитка 2', subtitle: 'Описание', image: '', url: '#', color: '#8b5cf6' },
        { title: 'Плитка 3', subtitle: 'Описание', image: '', url: '#', color: '#ec4899' },
        { title: 'Плитка 4', subtitle: 'Описание', image: '', url: '#', color: '#14b8a6' },
      ],
      layout: 'grid',
      aspectRatio: 'square',
    },
    style: {
      padding: '40px 20px',
    },
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    position: {
      x: 50,
      y: 50,
      width: 1000,
      height: 600,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      tiles: { type: 'array', label: 'Плитки' },
      layout: {
        type: 'select',
        label: 'Макет',
        options: [
          { value: 'grid', label: 'Сетка 4' },
          { value: 'list', label: 'Список 2' },
        ],
      },
      aspectRatio: {
        type: 'select',
        label: 'Пропорции',
        options: [
          { value: 'square', label: 'Квадрат' },
          { value: 'video', label: 'Видео (16:9)' },
          { value: 'portrait', label: 'Портрет (3:4)' },
          { value: 'landscape', label: 'Ландшафт (4:3)' },
        ],
      },
    },
  },
};
