import React, { useState } from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryWidgetProps {
  widget: WidgetData;
}

export const GalleryWidget: React.FC<GalleryWidgetProps> = ({ widget }) => {
  const { content, style } = widget;
  const images = content.images || [];
  const layout = content.layout || 'grid';
  const columns = content.columns || 3;
  const spacing = content.spacing || 'gap-4';
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const spacingClasses: Record<string, string> = {
    'gap-2': 'gap-2',
    'gap-4': 'gap-4',
    'gap-6': 'gap-6',
    'gap-8': 'gap-8',
  };

  const openLightbox = (index: number) => {
    if (!isPreview) return;
    setSelectedImage(index);
  };

  const closeLightbox = () => setSelectedImage(null);

  const goToPrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  return (
    <div
      className="w-full py-8 px-4"
      style={style}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      {layout === 'grid' ? (
        <div className={`grid ${spacingClasses[spacing]}`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {images.length > 0 ? (
            images.map((image: any, index: number) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src || 'https://via.placeholder.com/400x400'}
                  alt={image.alt || `Изображение ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))
          ) : (
            Array.from({ length: columns * 2 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-400">Фото {index + 1}</span>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {images.length > 0 ? (
            images.map((image: any, index: number) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 h-48 overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src || 'https://via.placeholder.com/400x300'}
                  alt={image.alt || `Изображение ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 h-48 bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-400">Фото {index + 1}</span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Lightbox */}
      {selectedImage !== null && isPreview && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            className="absolute left-4 text-white hover:text-gray-300"
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
          >
            <ChevronLeft className="w-12 h-12" />
          </button>
          
          <img
            src={images[selectedImage]?.src || ''}
            alt={images[selectedImage]?.alt || ''}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            className="absolute right-4 text-white hover:text-gray-300"
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>
      )}
    </div>
  );
};

export const galleryWidgetConfig = {
  type: 'gallery' as WidgetType,
  name: 'Галерея',
  icon: 'Grid3x3',
  category: 'Медиа',
  defaultData: {
    id: '',
    type: 'gallery' as WidgetType,
    name: 'Галерея',
    content: {
      images: [],
      layout: 'grid',
      columns: 3,
      spacing: 'gap-4',
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
      width: 800,
      height: 600,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      images: { type: 'array', label: 'Изображения' },
      layout: {
        type: 'select',
        label: 'Макет',
        options: [
          { value: 'grid', label: 'Сетка' },
          { value: 'slider', label: 'Слайдер' },
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
      spacing: {
        type: 'select',
        label: 'Расстояние',
        options: [
          { value: 'gap-2', label: 'Малое' },
          { value: 'gap-4', label: 'Среднее' },
          { value: 'gap-6', label: 'Большое' },
          { value: 'gap-8', label: 'Очень большое' },
        ],
      },
    },
  },
};
