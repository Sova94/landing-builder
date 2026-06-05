import React from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';

interface GridSectionWidgetProps {
  widget: WidgetData;
  isPreview?: boolean;
}

export const GridSectionWidget: React.FC<GridSectionWidgetProps> = ({ 
  widget, 
  isPreview = false 
}) => {
  const { content, style } = widget;
  const columns = content.columns || 3;
  const gap = content.gap || 'gap-4';
  
  const gapClasses: Record<string, string> = {
    'gap-1': 'gap-1',
    'gap-2': 'gap-2',
    'gap-3': 'gap-3',
    'gap-4': 'gap-4',
    'gap-6': 'gap-6',
    'gap-8': 'gap-8',
  };
  
  return (
    <div
      className={`grid w-full ${gapClasses[gap] || 'gap-4'}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        ...style,
      }}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      {Array.from({ length: columns }).map((_, colIndex) => (
        <div
          key={colIndex}
          className={`min-h-[200px] rounded-lg p-4 ${
            isPreview 
              ? 'bg-gray-50' 
              : 'bg-gray-50 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors'
          }`}
        >
          <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
            <div className="text-3xl mb-2">+</div>
            <div className="text-xs">Колонка {colIndex + 1}</div>
            {!isPreview && (
              <div className="mt-2 text-xs text-blue-500">
                Нажмите для добавления
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export const gridSectionWidgetConfig = {
  type: 'gridSection' as WidgetType,
  name: 'Сетка колонок',
  icon: 'Grid',
  category: 'Макет',
  defaultData: {
    id: '',
    type: 'gridSection' as WidgetType,
    name: 'Сетка',
    content: {
      columns: 3,
      gap: 'gap-4',
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
      columns: {
        type: 'select',
        label: 'Количество колонок',
        options: [
          { value: 1, label: '1 колонка' },
          { value: 2, label: '2 колонки' },
          { value: 3, label: '3 колонки' },
          { value: 4, label: '4 колонки' },
        ],
      },
      gap: {
        type: 'select',
        label: 'Расстояние между колонками',
        options: [
          { value: 'gap-1', label: '4px' },
          { value: 'gap-2', label: '8px' },
          { value: 'gap-3', label: '12px' },
          { value: 'gap-4', label: '16px' },
          { value: 'gap-6', label: '24px' },
          { value: 'gap-8', label: '32px' },
        ],
      },
    },
  },
};
