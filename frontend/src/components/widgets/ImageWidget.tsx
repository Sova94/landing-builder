import React from 'react';
import type { WidgetData, WidgetType } from '@types/index';

interface ImageWidgetProps {
  widget: WidgetData;
  isPreview?: boolean;
}

export const ImageWidget: React.FC<ImageWidgetProps> = ({ widget, isPreview = false }) => {
  const { content, style } = widget;
  const src = content.src || '';
  const alt = content.alt || 'Изображение';
  const objectFit = content.objectFit || 'cover';
  const borderRadius = content.borderRadius || '0';
  const caption = content.caption || '';
  const link = content.link || '';

  const imageElement = (
    <img
      src={src || 'https://via.placeholder.com/800x600?text=Изображение'}
      alt={alt}
      className="w-full h-full"
      style={{
        objectFit: objectFit as any,
        borderRadius: `${borderRadius}px`,
      }}
    />
  );

  return (
    <div
      className="w-full"
      style={style}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      {link ? (
        <a href={link} className="block" target="_blank" rel="noopener noreferrer">
          {imageElement}
        </a>
      ) : (
        imageElement
      )}
      
      {caption && (
        <p className="text-center text-gray-500 text-sm mt-2">{caption}</p>
      )}
    </div>
  );
};

export const imageWidgetConfig = {
  type: 'image' as WidgetType,
  name: 'Изображение',
  icon: 'Image',
  category: 'Медиа',
  defaultData: {
    id: '',
    type: 'image' as WidgetType,
    name: 'Изображение',
    content: {
      src: '',
      alt: 'Изображение',
      objectFit: 'cover',
      borderRadius: 0,
      caption: '',
      link: '',
    },
    style: {},
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    position: {
      x: 50,
      y: 50,
      width: 400,
      height: 300,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      src: { type: 'image', label: 'Изображение' },
      alt: { type: 'text', label: 'Alt текст' },
      objectFit: {
        type: 'select',
        label: 'Заполнение',
        options: [
          { value: 'cover', label: 'Заполнить' },
          { value: 'contain', label: 'Вместить' },
          { value: 'fill', label: 'Растянуть' },
        ],
      },
      borderRadius: { type: 'number', label: 'Скругление (px)' },
      caption: { type: 'text', label: 'Подпись' },
      link: { type: 'url', label: 'Ссылка' },
    },
  },
};
