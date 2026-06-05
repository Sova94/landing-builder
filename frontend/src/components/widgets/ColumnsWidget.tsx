import React from 'react';
import type { WidgetData, WidgetType } from '@types/index';
import { useEditorStore } from '@store/editorStore';
import { TextEdit } from '@components/editor/TextEdit';
import { Plus, Trash2 } from 'lucide-react';

interface ColumnsWidgetProps {
  widget: WidgetData;
  isPreview?: boolean;
}

export const ColumnsWidget: React.FC<ColumnsWidgetProps> = ({ widget, isPreview = false }) => {
  const { content, style } = widget;
  const { updateWidget } = useEditorStore();
  const columns = content.columns || 3;
  const gap = content.gap || 'gap-6';
  const alignment = content.alignment || 'left';
  const items = content.items || [
    { title: 'Заголовок 1', text: 'Текст описания колонки 1', icon: '📌' },
    { title: 'Заголовок 2', text: 'Текст описания колонки 2', icon: '📌' },
    { title: 'Заголовок 3', text: 'Текст описания колонки 3', icon: '📌' },
  ];

  const gapClasses: Record<string, string> = {
    'gap-4': 'gap-4',
    'gap-6': 'gap-6',
    'gap-8': 'gap-8',
    'gap-12': 'gap-12',
  };

  const alignmentClasses: Record<string, string> = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right',
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateWidget(widget.id, {
      content: { ...content, items: newItems },
    });
  };

  const handleAddColumn = () => {
    const newItem = {
      title: 'Новая колонка',
      text: 'Описание новой колонки',
      icon: '📌',
    };
    updateWidget(widget.id, {
      content: { ...content, items: [...items, newItem] },
    });
  };

  const handleRemoveColumn = (index: number) => {
    if (items.length <= 1) return;
    const newItems = items.filter((_: any, i: number) => i !== index);
    updateWidget(widget.id, {
      content: { ...content, items: newItems },
    });
  };

  return (
    <div
      className="w-full py-12 px-4"
      style={style}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`grid ${gapClasses[gap]}`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {items.map((item: any, index: number) => (
            <div
              key={index}
              className={`relative group p-6 rounded-xl hover:bg-gray-50 ${alignmentClasses[alignment]}`}
            >
              {!isPreview && (
                <button
                  onClick={() => handleRemoveColumn(index)}
                  className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-200 transition-all"
                  title="Удалить колонку"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              
              {item.icon && (
                <TextEdit
                  value={item.icon}
                  onChange={(value) => handleItemChange(index, 'icon', value)}
                  tagName="div"
                  placeholder="📌"
                  multiline={false}
                  className="text-4xl mb-4 block"
                />
              )}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <TextEdit
                value={item.title}
                onChange={(value) => handleItemChange(index, 'title', value)}
                tagName="h3"
                placeholder="Заголовок"
                multiline={false}
                className="text-xl font-semibold text-gray-900 mb-3 block"
              />
              <TextEdit
                value={item.text}
                onChange={(value) => handleItemChange(index, 'text', value)}
                tagName="p"
                placeholder="Текст описания"
                multiline
                className="text-gray-600 block"
              />
              {item.link && (
                <a
                  href={item.link}
                  className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Подробнее →
                </a>
              )}
            </div>
          ))}
          
          {/* Кнопка добавления колонки */}
          {!isPreview && (
            <button
              onClick={handleAddColumn}
              className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-500"
              title="Добавить колонку"
            >
              <Plus className="w-8 h-8" />
              <span className="text-sm font-medium">Добавить колонку</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const columnsWidgetConfig = {
  type: 'columns' as WidgetType,
  name: 'Колонки',
  icon: 'Columns',
  category: 'Базовые',
  defaultData: {
    id: '',
    type: 'columns' as WidgetType,
    name: 'Колонки',
    content: {
      columns: 3,
      gap: 'gap-6',
      alignment: 'left',
      items: [
        { title: 'Заголовок 1', text: 'Текст описания колонки 1', icon: '📌' },
        { title: 'Заголовок 2', text: 'Текст описания колонки 2', icon: '📌' },
        { title: 'Заголовок 3', text: 'Текст описания колонки 3', icon: '📌' },
      ],
    },
    style: {
      backgroundColor: '#ffffff',
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
      width: 1000,
      height: 400,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      columns: {
        type: 'select',
        label: 'Количество колонок',
        options: [
          { value: 2, label: '2' },
          { value: 3, label: '3' },
          { value: 4, label: '4' },
        ],
      },
      gap: {
        type: 'select',
        label: 'Расстояние',
        options: [
          { value: 'gap-4', label: 'Малое' },
          { value: 'gap-6', label: 'Среднее' },
          { value: 'gap-8', label: 'Большое' },
          { value: 'gap-12', label: 'Очень большое' },
        ],
      },
      alignment: {
        type: 'select',
        label: 'Выравнивание текста',
        options: [
          { value: 'left', label: 'Слева' },
          { value: 'center', label: 'По центру' },
          { value: 'right', label: 'Справа' },
        ],
      },
      items: { type: 'array', label: 'Элементы колонок' },
    },
  },
};
