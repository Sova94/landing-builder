import React from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';

interface DividerWidgetProps {
  widget: WidgetData;
}

export const DividerWidget: React.FC<DividerWidgetProps> = ({ widget }) => {
  const { content, style } = widget;
  const dividerType = content.dividerType || 'line';
  const color = content.color || '#e5e7eb';
  const thickness = content.thickness || 1;
  const width = content.width || '100%';
  const spacing = content.spacing || '60px';

  const dividerStyles: Record<string, React.CSSProperties> = {
    line: {
      height: `${thickness}px`,
      backgroundColor: color,
      width: width,
    },
    dots: {
      height: `${thickness * 2}px`,
      backgroundImage: `radial-gradient(${color} 2px, transparent 2px)`,
      backgroundSize: '10px 10px',
      width: width,
    },
    dashed: {
      height: `${thickness}px`,
      borderTop: `${thickness}px dashed ${color}`,
      width: width,
    },
    gradient: {
      height: `${thickness}px`,
      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      width: width,
    },
    wave: {
      height: '30px',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z' fill='${encodeURIComponent(color)}'/%3E%3C/svg%3E")`,
      backgroundSize: 'cover',
      width: width,
    },
  };

  return (
    <div
      className="w-full py-4"
      style={{ padding: `${spacing} 0`, ...style }}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      <div style={dividerStyles[dividerType] || dividerStyles.line} />
    </div>
  );
};

export const dividerWidgetConfig = {
  type: 'divider' as WidgetType,
  name: 'Разделитель',
  icon: 'Minus',
  category: 'Базовые',
  defaultData: {
    id: '',
    type: 'divider' as WidgetType,
    name: 'Разделитель',
    content: {
      dividerType: 'line',
      color: '#e5e7eb',
      thickness: 1,
      width: '100%',
      spacing: '60px',
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
      width: 1000,
      height: 100,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      dividerType: {
        type: 'select',
        label: 'Тип разделителя',
        options: [
          { value: 'line', label: 'Линия' },
          { value: 'dots', label: 'Точки' },
          { value: 'dashed', label: 'Пунктир' },
          { value: 'gradient', label: 'Градиент' },
          { value: 'wave', label: 'Волна' },
        ],
      },
      color: { type: 'color', label: 'Цвет' },
      thickness: { type: 'number', label: 'Толщина (px)' },
      width: { type: 'text', label: 'Ширина' },
      spacing: {
        type: 'select',
        label: 'Отступы',
        options: [
          { value: '20px', label: 'Малые' },
          { value: '40px', label: 'Средние' },
          { value: '60px', label: 'Большие' },
          { value: '80px', label: 'Очень большие' },
        ],
      },
    },
  },
};
