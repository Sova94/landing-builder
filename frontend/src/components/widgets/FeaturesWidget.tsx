import React from 'react';
import type { WidgetData, WidgetType } from '@types/index';
import { Check, Star, Zap, Shield, Heart, Target } from 'lucide-react';

interface FeaturesWidgetProps {
  widget: WidgetData;
  isPreview?: boolean;
}

export const FeaturesWidget: React.FC<FeaturesWidgetProps> = ({ widget, isPreview = false }) => {
  const { content, style } = widget;
  const title = content.title || 'Наши преимущества';
  const subtitle = content.subtitle || '';
  const features = content.features || [
    { icon: 'Zap', title: 'Быстро', description: 'Мгновенная загрузка и работа' },
    { icon: 'Shield', title: 'Надёжно', description: 'Защита данных 24/7' },
    { icon: 'Heart', title: 'Качественно', description: 'Внимание к деталям' },
    { icon: 'Target', title: 'Точно', description: 'Попадаем в потребности' },
  ];
  const layout = content.layout || 'grid';
  const columns = content.columns || 4;

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'Check': Check,
    'Star': Star,
    'Zap': Zap,
    'Shield': Shield,
    'Heart': Heart,
    'Target': Target,
  };

  return (
    <div
      className="w-full py-16 px-4"
      style={style}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Преимущества */}
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {features.map((feature: any, index: number) => {
            const IconComponent = iconMap[feature.icon] || Check;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow bg-white"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const featuresWidgetConfig = {
  type: 'features' as WidgetType,
  name: 'Преимущества',
  icon: 'Star',
  category: 'Базовые',
  defaultData: {
    id: '',
    type: 'features' as WidgetType,
    name: 'Преимущества',
    content: {
      title: 'Наши преимущества',
      subtitle: 'Почему выбирают нас',
      features: [
        { icon: 'Zap', title: 'Быстро', description: 'Мгновенная загрузка и работа' },
        { icon: 'Shield', title: 'Надёжно', description: 'Защита данных 24/7' },
        { icon: 'Heart', title: 'Качественно', description: 'Внимание к деталям' },
        { icon: 'Target', title: 'Точно', description: 'Попадаем в потребности' },
      ],
      layout: 'grid',
      columns: 4,
    },
    style: {
      backgroundColor: '#f9fafb',
      padding: '80px 20px',
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
      height: 500,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      title: { type: 'text', label: 'Заголовок' },
      subtitle: { type: 'text', label: 'Подзаголовок' },
      features: { type: 'array', label: 'Преимущества' },
      layout: {
        type: 'select',
        label: 'Макет',
        options: [
          { value: 'grid', label: 'Сетка' },
          { value: 'list', label: 'Список' },
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
    },
  },
};
