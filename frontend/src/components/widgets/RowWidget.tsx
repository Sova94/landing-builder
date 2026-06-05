import React from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';

interface RowWidgetProps {
  widget: WidgetData;
  onAddWidget?: () => void;
  children?: React.ReactNode;
}

export const RowWidget: React.FC<RowWidgetProps> = ({ 
  widget = false,
  onAddWidget,
  children 
}) => {
  const { content, style } = widget;
  const alignment = content.alignment || 'flex-start';
  const wrap = content.wrap !== false;
  
  const alignmentClasses: Record<string, string> = {
    'flex-start': 'justify-start',
    'center': 'justify-center',
    'flex-end': 'justify-end',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
  };
  
  return (
    <div
      className={`flex ${alignmentClasses[alignment] || 'flex-start'} ${
        wrap ? 'flex-wrap' : 'flex-nowrap'
      } gap-4`}
      style={style}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      {children}
      
      {!isPreview && (
        <button
          className="min-w-[100px] h-[100px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 transition-colors"
          onClick={onAddWidget}
        >
          <span className="text-2xl">+</span>
        </button>
      )}
    </div>
  );
};

export const rowWidgetConfig = {
  type: 'row' as WidgetType,
  name: 'Ряд',
  icon: 'Row',
  category: 'Макет',
  defaultData: {
    id: '',
    type: 'row' as WidgetType,
    name: 'Ряд',
    content: {
      alignment: 'flex-start',
      wrap: true,
    },
    style: {
      padding: '20px 0',
    },
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
  },
  settingsSchema: {
    content: {
      alignment: {
        type: 'select',
        label: 'Выравнивание',
        options: [
          { value: 'flex-start', label: 'Слева' },
          { value: 'center', label: 'По центру' },
          { value: 'flex-end', label: 'Справа' },
          { value: 'space-between', label: 'По ширине' },
          { value: 'space-around', label: 'Равномерно' },
        ],
      },
      wrap: {
        type: 'boolean',
        label: 'Перенос на новую строку',
      },
    },
  },
};
