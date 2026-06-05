import React from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';
import { useEditorStore } from '@store/editorStore';
import { TextEdit } from '@components/editor/TextEdit';

interface HeadingWidgetProps {
  widget: WidgetData;
  ;
}

export const HeadingWidget: React.FC<HeadingWidgetProps> = ({ widget = false }) => {
  const { content, style } = widget;
  const { updateWidget } = useEditorStore();
  let level = (content.level as number) || 1;
  // Ограничиваем уровень от 1 до 6
  level = Math.max(1, Math.min(6, level));
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const handleTextChange = (newText: string) => {
    updateWidget(widget.id, {
      content: { ...content, text: newText },
    });
  };
  
  const inlineStyles: React.CSSProperties = {
    color: style.colors?.text,
    fontFamily: style.typography?.fontFamily,
    fontSize: style.typography?.fontSize,
    fontWeight: style.typography?.fontWeight,
    lineHeight: style.typography?.lineHeight,
    textAlign: style.typography?.textAlign,
    padding: style.spacing?.padding,
    margin: style.spacing?.margin,
  };
  
  return (
    <div
      className="widget-heading"
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      {isPreview ? (
        <Tag style={inlineStyles}>{content.text || 'Заголовок'}</Tag>
      ) : (
        <TextEdit
          value={content.text || 'Заголовок'}
          onChange={handleTextChange}
          tagName={Tag}
          placeholder="Введите заголовок..."
          className="font-bold"
          style={inlineStyles}
        />
      )}
    </div>
  );
};

export const headingWidgetConfig = {
  type: 'heading' as WidgetType,
  name: 'Заголовок',
  icon: 'Heading',
  category: 'Текст',
  defaultData: {
    id: '',
    type: 'heading' as WidgetType,
    name: 'Заголовок',
    content: {
      text: 'Ваш заголовок',
      level: 1,
    },
    style: {
      colors: {
        text: '#1a1a1a',
      },
      typography: {
        fontSize: '48px',
        fontWeight: '700',
        lineHeight: '1.2',
        textAlign: 'center' as const,
      },
      spacing: {
        padding: '0',
        margin: '0',
      },
    },
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
  },
  settingsSchema: {
    content: {
      text: {
        type: 'text',
        label: 'Текст заголовка',
        required: true,
      },
      level: {
        type: 'select',
        label: 'Уровень заголовка',
        options: [
          { value: 1, label: 'H1' },
          { value: 2, label: 'H2' },
          { value: 3, label: 'H3' },
          { value: 4, label: 'H4' },
        ],
      },
    },
    style: {
      colors: {
        text: {
          type: 'color',
          label: 'Цвет текста',
        },
      },
      typography: {
        fontSize: {
          type: 'text',
          label: 'Размер шрифта',
        },
        fontWeight: {
          type: 'select',
          label: 'Жирность',
          options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
        },
        textAlign: {
          type: 'select',
          label: 'Выравнивание',
          options: ['left', 'center', 'right', 'justify'],
        },
      },
    },
  },
};
