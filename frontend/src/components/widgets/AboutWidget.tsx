import React from 'react';
import type { WidgetData, WidgetType } from '@types/index';

interface AboutWidgetProps {
  widget: WidgetData;
  isPreview?: boolean;
}

export const AboutWidget: React.FC<AboutWidgetProps> = ({ widget, isPreview = false }) => {
  const { content, style } = widget;
  const title = content.title || 'О проекте';
  const description = content.description || 'Описание проекта';
  const image = content.image || '';
  const imagePosition = content.imagePosition || 'right';
  const features = content.features || [];

  return (
    <div
      className={`w-full py-16 px-8`}
      style={style}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      <div className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center ${
        imagePosition === 'left' ? '' : 'md:grid-flow-dense'
      }`}>
        {/* Изображение */}
        <div className={`${imagePosition === 'left' ? 'md:col-start-1' : 'md:col-start-1'}`}>
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
            />
          ) : (
            <div className="w-full h-[400px] bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <span className="text-gray-400">Изображение</span>
            </div>
          )}
        </div>

        {/* Контент */}
        <div className={`${imagePosition === 'left' ? 'md:col-start-2' : ''}`}>
          <h2 className="text-4xl font-bold mb-6">{title}</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">{description}</p>

          {/* Особенности */}
          {features.length > 0 && (
            <div className="space-y-4">
              {features.map((feature: any, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    {feature.icon || '✓'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const aboutWidgetConfig = {
  type: 'about' as WidgetType,
  name: 'О проекте',
  icon: 'Info',
  category: 'Базовые',
  defaultData: {
    id: '',
    type: 'about' as WidgetType,
    name: 'О проекте',
    content: {
      title: 'О проекте',
      description: 'Расскажите о вашем проекте, продукте или услуге. Этот блок поможет посетителям узнать больше о вас.',
      image: '',
      imagePosition: 'right',
      features: [
        { icon: '✓', title: 'Особенность 1', description: 'Описание особенности' },
        { icon: '✓', title: 'Особенность 2', description: 'Описание особенности' },
      ],
    },
    style: {
      backgroundColor: '#ffffff',
    },
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    position: {
      x: 0,
      y: 0,
      width: 1200,
      height: 600,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      title: { type: 'text', label: 'Заголовок' },
      description: { type: 'textarea', label: 'Описание' },
      image: { type: 'image', label: 'Изображение' },
      imagePosition: {
        type: 'select',
        label: 'Позиция изображения',
        options: [
          { value: 'left', label: 'Слева' },
          { value: 'right', label: 'Справа' },
        ],
      },
      features: { type: 'array', label: 'Особенности' },
    },
  },
};
