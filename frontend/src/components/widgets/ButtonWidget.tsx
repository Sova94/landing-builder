import React from 'react';
import type { WidgetData, WidgetType } from '@types/index';
import { useEditorStore } from '@store/editorStore';
import { TextEdit } from '@components/editor/TextEdit';

interface ButtonWidgetProps {
  widget: WidgetData;
  isPreview?: boolean;
}

export const ButtonWidget: React.FC<ButtonWidgetProps> = ({ widget, isPreview = false }) => {
  const { content, style } = widget;
  const { updateWidget } = useEditorStore();
  
  const handleTextChange = (newText: string) => {
    updateWidget(widget.id, {
      content: { ...content, text: newText },
    });
  };
  
  const buttonStyles: React.CSSProperties = {
    backgroundColor: style.colors?.background || '#000000',
    color: style.colors?.text || '#ffffff',
    fontFamily: style.typography?.fontFamily,
    fontSize: style.typography?.fontSize,
    fontWeight: style.typography?.fontWeight,
    padding: style.spacing?.padding || '12px 32px',
    borderRadius: style.border?.radius || '8px',
    border: style.border?.width ? `${style.border.width} ${style.border.style || 'solid'} ${style.border.color || 'transparent'}` : 'none',
    boxShadow: style.shadow?.enabled 
      ? `${style.shadow.offsetX || '0'} ${style.shadow.offsetY || '4px'} ${style.shadow.blur || '6px'} ${style.shadow.color || 'rgba(0,0,0,0.1)'}`
      : undefined,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };
  
  const handleClick = () => {
    if (content.onClick) {
      console.log('Button clicked:', content.onClick);
    }
  };
  
  return (
    <div
      className="widget-button-wrapper inline-block"
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      {isPreview ? (
        <button
          className="inline-flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-95"
          style={buttonStyles}
          onClick={handleClick}
        >
          {content.icon && <span className="button-icon">{content.icon}</span>}
          {content.text || 'Кнопка'}
        </button>
      ) : (
        <TextEdit
          value={content.text || 'Кнопка'}
          onChange={handleTextChange}
          tagName="button"
          placeholder="Текст кнопки"
          className="inline-flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-95"
          style={buttonStyles}
        />
      )}
    </div>
  );
};

export const buttonWidgetConfig = {
  type: 'button' as WidgetType,
  name: 'Кнопка',
  icon: 'MousePointerClick',
  category: 'Кнопки',
  defaultData: {
    id: '',
    type: 'button' as WidgetType,
    name: 'Кнопка',
    content: {
      text: 'Нажми меня',
      url: '#',
      onClick: null,
      icon: null,
      newTab: false,
    },
    style: {
      colors: {
        background: '#000000',
        text: '#ffffff',
      },
      typography: {
        fontSize: '16px',
        fontWeight: '500',
      },
      spacing: {
        padding: '12px 32px',
      },
      border: {
        radius: '8px',
      },
      shadow: {
        enabled: false,
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
        label: 'Текст кнопки',
        required: true,
      },
      url: {
        type: 'text',
        label: 'Ссылка',
      },
      icon: {
        type: 'icon',
        label: 'Иконка',
      },
      newTab: {
        type: 'checkbox',
        label: 'Открыть в новой вкладке',
      },
    },
    style: {
      colors: {
        background: {
          type: 'color',
          label: 'Цвет фона',
        },
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
      },
      spacing: {
        padding: {
          type: 'text',
          label: 'Внутренние отступы',
        },
      },
      border: {
        radius: {
          type: 'text',
          label: 'Скругление',
        },
      },
      shadow: {
        enabled: {
          type: 'checkbox',
          label: 'Тень',
        },
      },
    },
  },
};
