import React from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';
import { useEditorStore } from '@store/editorStore';
import { TextEdit } from '@components/editor/TextEdit';

interface CoverWidgetProps {
  widget: WidgetData;
}

export const CoverWidget: React.FC<CoverWidgetProps> = ({ widget }) => {
  const { content, style } = widget;
  const { updateWidget } = useEditorStore();
  const title = content.title || 'Заголовок обложки';
  const subtitle = content.subtitle || 'Подзаголовок обложки';
  const backgroundImage = content.backgroundImage || '';
  const backgroundVideo = content.backgroundVideo || '';
  const overlayColor = content.overlayColor || 'rgba(0, 0, 0, 0.5)';
  const height = content.height || '100vh';
  const alignment = content.alignment || 'center';
  const button = content.button;

  const handleTitleChange = (newTitle: string) => {
    updateWidget(widget.id, {
      content: { ...content, title: newTitle },
    });
  };

  const handleSubtitleChange = (newSubtitle: string) => {
    updateWidget(widget.id, {
      content: { ...content, subtitle: newSubtitle },
    });
  };

  const handleButtonTextChange = (newText: string) => {
    updateWidget(widget.id, {
      content: { 
        ...content, 
        button: { ...button, text: newText }
      },
    });
  };

  const alignmentClasses: Record<string, string> = {
    'top-left': 'justify-start items-start text-left',
    'top-center': 'justify-start items-center text-center',
    'top-right': 'justify-start items-end text-right',
    'center-left': 'justify-center items-start text-left',
    'center': 'justify-center items-center text-center',
    'center-right': 'justify-center items-end text-right',
    'bottom-left': 'justify-end items-start text-left',
    'bottom-center': 'justify-end items-center text-center',
    'bottom-right': 'justify-end items-end text-right',
  };

  return (
    <div
      className={`relative w-full flex ${alignmentClasses[alignment] || 'justify-center items-center text-center'}`}
      style={{
        height: height,
        minHeight: '500px',
        overflow: 'hidden',
        ...style,
      }}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      {/* Фоновое изображение или видео */}
      {backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
        />
      ) : backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600" />
      )}

      {/* Затемнение */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor }}
      />

      {/* Контент */}
      <div className="relative z-10 p-8 max-w-4xl mx-auto pointer-events-auto">
        {isPreview ? (
          <>
            <h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}

            {button && (
              <button
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                onClick={() => {}}
              >
                {button.text || 'Кнопка'}
              </button>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <TextEdit
              value={title}
              onChange={handleTitleChange}
              tagName="h1"
              placeholder="Заголовок обложки"
              multiline={false}
              className="text-5xl md:text-7xl font-bold text-white mb-6 block"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            />
            
            {subtitle && (
              <TextEdit
                value={subtitle}
                onChange={handleSubtitleChange}
                tagName="p"
                placeholder="Подзаголовок обложки"
                multiline={false}
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto block"
              />
            )}

            {button && (
              <TextEdit
                value={button.text || 'Кнопка'}
                onChange={handleButtonTextChange}
                tagName="button"
                placeholder="Текст кнопки"
                multiline={false}
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-block"
              />
            )}
          </div>
        )}
      </div>

      {/* Скролл индикатор */}
      {!isPreview && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export const coverWidgetConfig = {
  type: 'cover' as WidgetType,
  name: 'Обложка',
  icon: 'Image',
  category: 'Базовые',
  defaultData: {
    id: '',
    type: 'cover' as WidgetType,
    name: 'Обложка',
    content: {
      title: 'Заголовок обложки',
      subtitle: 'Подзаголовок обложки',
      backgroundImage: '',
      backgroundVideo: '',
      overlayColor: 'rgba(0, 0, 0, 0.5)',
      height: '100vh',
      alignment: 'center',
      button: {
        text: 'Узнать больше',
        url: '#',
      },
    },
    style: {},
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    position: {
      x: 0,
      y: 0,
      width: 1200,
      height: 800,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      title: { type: 'text', label: 'Заголовок' },
      subtitle: { type: 'text', label: 'Подзаголовок' },
      backgroundImage: { type: 'image', label: 'Фоновое изображение' },
      backgroundVideo: { type: 'video', label: 'Фоновое видео' },
      overlayColor: { type: 'color', label: 'Цвет затемнения' },
      height: {
        type: 'select',
        label: 'Высота',
        options: [
          { value: '500px', label: '500px' },
          { value: '600px', label: '600px' },
          { value: '700px', label: '700px' },
          { value: '800px', label: '800px' },
          { value: '100vh', label: 'На весь экран' },
        ],
      },
      alignment: {
        type: 'select',
        label: 'Позиция контента',
        options: [
          { value: 'top-left', label: 'Верх лево' },
          { value: 'top-center', label: 'Верх центр' },
          { value: 'top-right', label: 'Верх право' },
          { value: 'center-left', label: 'Центр лево' },
          { value: 'center', label: 'Центр' },
          { value: 'center-right', label: 'Центр право' },
          { value: 'bottom-left', label: 'Низ лево' },
          { value: 'bottom-center', label: 'Низ центр' },
          { value: 'bottom-right', label: 'Низ право' },
        ],
      },
      button: { type: 'object', label: 'Кнопка' },
    },
  },
};
