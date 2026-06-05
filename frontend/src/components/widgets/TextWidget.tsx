import React from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';
import { useEditorStore } from '@store/editorStore';
import { TextEdit } from '@components/editor/TextEdit';

interface TextWidgetProps {
  widget: WidgetData;
}

export const TextWidget: React.FC<TextWidgetProps> = ({ widget }) => {
  const { content, style } = widget;
  const { updateWidget } = useEditorStore();
  const text = content.text || 'Текстовый блок. Нажмите чтобы редактировать.';
  
  const handleTextChange = (newText: string) => {
    updateWidget(widget.id, {
      content: { ...content, text: newText },
    });
  };
  
  return (
    <div
      className="text-widget w-full"
      style={style}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      {isPreview ? (
        <p>{text}</p>
      ) : (
        <TextEdit
          value={text}
          onChange={handleTextChange}
          tagName="p"
          placeholder="Введите текст..."
          multiline
          className="text-gray-700 leading-relaxed"
        />
      )}
    </div>
  );
};

export const textWidgetConfig = {
  type: 'text' as WidgetType,
  name: 'Текст',
  icon: 'Type',
  category: 'Базовые',
  defaultData: {
    id: '',
    type: 'text' as WidgetType,
    name: 'Текст',
    content: {
      text: 'Текстовый блок. Нажмите чтобы редактировать.',
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
      height: 100,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      text: {
        type: 'textarea',
        label: 'Текст',
      },
    },
  },
};

