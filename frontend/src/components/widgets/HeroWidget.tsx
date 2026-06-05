import React from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';

interface HeroWidgetProps {
  widget: WidgetData;
  isPreview?: boolean;
}

export const HeroWidget: React.FC<HeroWidgetProps> = ({ widget, isPreview = false }) => {
  const { content, style } = widget;
  
  const containerStyles: React.CSSProperties = {
    minHeight: content.minHeight || '600px',
    backgroundImage: style.backgroundImage?.url 
      ? `url(${style.backgroundImage.url})`
      : undefined,
    backgroundSize: style.backgroundImage?.size || 'cover',
    backgroundPosition: style.backgroundImage?.position || 'center',
    backgroundColor: style.colors?.background,
    position: 'relative',
    overflow: 'hidden',
  };
  
  const overlayStyles: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundColor: style.backgroundImage?.overlay,
    zIndex: 1,
  };
  
  const contentStyles: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    maxWidth: content.maxWidth || '1200px',
    margin: '0 auto',
    padding: style.spacing?.padding || '80px 20px',
    textAlign: content.alignment || 'center',
  };
  
  return (
    <section
      className="widget-hero relative flex items-center"
      style={containerStyles}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      {style.backgroundImage?.overlay && (
        <div style={overlayStyles} />
      )}
      
      <div style={contentStyles} className="mx-auto">
        {content.eyebrow && (
          <p className="hero-eyebrow text-sm font-medium uppercase tracking-wider mb-4"
             style={{ color: style.colors?.text || '#ffffff', opacity: 0.8 }}>
            {content.eyebrow}
          </p>
        )}
        
        {content.title && (
          <h1 
            className="hero-title font-bold mb-6"
            style={{ 
              fontSize: content.titleSize || '56px',
              lineHeight: '1.1',
              color: style.colors?.text || '#ffffff',
            }}
          >
            {content.title}
          </h1>
        )}
        
        {content.subtitle && (
          <p 
            className="hero-subtitle mb-8"
            style={{ 
              fontSize: content.subtitleSize || '20px',
              color: style.colors?.text || '#ffffff',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto 32px',
            }}
          >
            {content.subtitle}
          </p>
        )}
        
        {content.buttons && content.buttons.length > 0 && (
          <div className="hero-buttons flex flex-wrap gap-4 justify-center">
            {content.buttons.map((button: any, index: number) => (
              <a
                key={index}
                href={button.url || '#'}
                className={`px-8 py-4 rounded-lg font-medium transition-all duration-200 hover:opacity-90 active:scale-95 ${
                  button.variant === 'secondary' 
                    ? 'bg-white/10 backdrop-blur border border-white/20' 
                    : 'bg-white text-black'
                }`}
                style={{ color: button.variant === 'secondary' ? '#ffffff' : '#000000' }}
              >
                {button.text}
              </a>
            ))}
          </div>
        )}
        
        {content.image && (
          <div className="hero-image mt-12">
            <img
              src={content.image.url}
              alt={content.image.alt || 'Hero image'}
              className="mx-auto max-w-full"
              style={{
                maxHeight: content.image.maxHeight || '400px',
                borderRadius: style.border?.radius,
              }}
            />
          </div>
        )}
      </div>
      
      {style.backgroundImage?.video && (
        <video
          className="absolute inset-0 w-full h-full object-cover -z-10"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={style.backgroundImage.video} type="video/mp4" />
        </video>
      )}
    </section>
  );
};

export const heroWidgetConfig = {
  type: 'hero' as WidgetType,
  name: 'Hero блок',
  icon: 'LayoutTemplate',
  category: 'Маркетинг',
  defaultData: {
    id: '',
    type: 'hero' as WidgetType,
    name: 'Hero блок',
    content: {
      eyebrow: 'Добро пожаловать',
      title: 'Создайте потрясающий лендинг',
      subtitle: 'Наш конструктор поможет вам сделать профессиональный сайт за считанные минуты',
      titleSize: '56px',
      subtitleSize: '20px',
      alignment: 'center' as const,
      minHeight: '600px',
      maxWidth: '1200px',
      buttons: [
        { text: 'Начать бесплатно', url: '#', variant: 'primary' as const },
        { text: 'Узнать больше', url: '#', variant: 'secondary' as const },
      ],
    },
    style: {
      colors: {
        background: '#000000',
        text: '#ffffff',
      },
      spacing: {
        padding: '80px 20px',
      },
      border: {
        radius: '0',
      },
      backgroundImage: {
        overlay: 'rgba(0,0,0,0.5)',
        size: 'cover' as const,
        position: 'center',
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
      eyebrow: {
        type: 'text',
        label: 'Надзаголовок',
      },
      title: {
        type: 'text',
        label: 'Заголовок',
        required: true,
      },
      subtitle: {
        type: 'textarea',
        label: 'Подзаголовок',
      },
      titleSize: {
        type: 'text',
        label: 'Размер заголовка',
      },
      subtitleSize: {
        type: 'text',
        label: 'Размер подзаголовка',
      },
      alignment: {
        type: 'select',
        label: 'Выравнивание',
        options: ['left', 'center', 'right'],
      },
      minHeight: {
        type: 'text',
        label: 'Минимальная высота',
      },
      buttons: {
        type: 'array',
        label: 'Кнопки',
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
      backgroundImage: {
        url: {
          type: 'image',
          label: 'Фоновое изображение',
        },
        video: {
          type: 'video',
          label: 'Фоновое видео',
        },
        overlay: {
          type: 'color',
          label: 'Цвет наложения',
        },
      },
    },
  },
};
