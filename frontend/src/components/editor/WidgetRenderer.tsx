import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@utils/cn';
import { TextWidget } from '@components/widgets/TextWidget';
import { HeadingWidget } from '@components/widgets/HeadingWidget';
import { ButtonWidget } from '@components/widgets/ButtonWidget';
import { HeroWidget } from '@components/widgets/HeroWidget';
import { CustomCodeWidget } from '@components/widgets/CustomCodeWidget';
import { GridSectionWidget } from '@components/widgets/GridSectionWidget';
import { RowWidget } from '@components/widgets/RowWidget';
import { CoverWidget } from '@components/widgets/CoverWidget';
import { AboutWidget } from '@components/widgets/AboutWidget';
import { ImageWidget } from '@components/widgets/ImageWidget';
import { GalleryWidget } from '@components/widgets/GalleryWidget';
import { FormWidget } from '@components/widgets/FormWidget';
import { FeaturesWidget } from '@components/widgets/FeaturesWidget';
import { ColumnsWidget } from '@components/widgets/ColumnsWidget';
import { MenuWidget } from '@components/widgets/MenuWidget';
import { ShopWidget } from '@components/widgets/ShopWidget';
import { DividerWidget } from '@components/widgets/DividerWidget';
import { PageListWidget } from '@components/widgets/PageListWidget';
import { TileWidget } from '@components/widgets/TileWidget';
import { FooterWidget } from '@components/widgets/FooterWidget';
import { VideoWidget } from '@components/widgets/VideoWidget';
import { TeamWidget } from '@components/widgets/TeamWidget';
import { GripVertical, Copy, Trash2, EyeOff, Eye } from 'lucide-react';
import { Button } from '@components/common/Button';
import { useEditorStore } from '@store/editorStore';
import type { WidgetData } from '@types/index';

interface WidgetRendererProps {
  widget: WidgetData;
  isSelected: boolean;
  isPreview: boolean;
  onSelect: () => void;
}

// Карта виджетов для рендеринга
const widgetComponents: Record<string, React.ComponentType<{ widget: WidgetData; isPreview?: boolean }>> = {
  text: TextWidget,
  heading: HeadingWidget,
  button: ButtonWidget,
  hero: HeroWidget,
  customCode: CustomCodeWidget,
  gridSection: GridSectionWidget,
  row: RowWidget,
  cover: CoverWidget,
  about: AboutWidget,
  image: ImageWidget,
  gallery: GalleryWidget,
  form: FormWidget,
  features: FeaturesWidget,
  columns: ColumnsWidget,
  menu: MenuWidget,
  shop: ShopWidget,
  divider: DividerWidget,
  pageList: PageListWidget,
  tile: TileWidget,
  footer: FooterWidget,
  video: VideoWidget,
  team: TeamWidget,
};

export const WidgetRenderer: React.FC<WidgetRendererProps> = ({
  widget,
  isSelected,
  isPreview,
  onSelect,
}) => {
  const { duplicateWidget, removeWidget, updateWidget } = useEditorStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const WidgetComponent = widgetComponents[widget.type];

  if (!WidgetComponent) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
        Неизвестный тип виджета: {widget.type}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'widget-wrapper relative group',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        isDragging && 'opacity-50',
        !widget.isVisible.desktop && 'opacity-50 grayscale',
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Панель управления виджетом - над виджетом */}
      {!isPreview && (
        <div className={cn(
          'widget-controls absolute -top-3 right-0 z-30 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 rounded-lg shadow-lg border border-gray-700',
          isSelected && 'opacity-100',
        )}>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-300 hover:text-white hover:bg-gray-700"
            {...attributes}
            {...listeners}
            title="Перетащить"
          >
            <GripVertical className="w-3.5 h-3.5" />
          </Button>
          
          <div className="w-px h-full bg-gray-700 my-1" />
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              duplicateWidget(widget.id);
            }}
            title="Дублировать"
          >
            <Copy className="w-3.5 h-3.5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              updateWidget(widget.id, {
                isVisible: {
                  ...widget.isVisible,
                  desktop: !widget.isVisible.desktop,
                },
              });
            }}
            title={widget.isVisible.desktop ? 'Скрыть' : 'Показать'}
          >
            {widget.isVisible.desktop ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
          </Button>
          
          <div className="w-px h-full bg-gray-700 my-1" />
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              removeWidget(widget.id);
            }}
            title="Удалить"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {/* Название виджета - слева сверху */}
      {!isPreview && (
        <div className={cn(
          'widget-label absolute -top-3 left-0 px-2.5 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-30 font-medium',
          isSelected && 'opacity-100',
        )}>
          {widget.name}
        </div>
      )}

      {/* Рендеринг виджета */}
      <div className={cn(
        'widget-content h-full',
        !widget.isVisible.desktop && 'pointer-events-none',
      )}>
        <WidgetComponent widget={widget} isPreview={isPreview} />
      </div>
    </div>
  );
};
