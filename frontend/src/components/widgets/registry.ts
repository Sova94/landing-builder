import type { WidgetType, WidgetData, WidgetRegistry } from '@types/index';
import { textWidgetConfig } from './TextWidget';
import { headingWidgetConfig } from './HeadingWidget';
import { buttonWidgetConfig } from './ButtonWidget';
import { heroWidgetConfig } from './HeroWidget';
import { customCodeWidgetConfig } from './CustomCodeWidget';
import { gridSectionWidgetConfig } from './GridSectionWidget';
import { rowWidgetConfig } from './RowWidget';
import { coverWidgetConfig } from './CoverWidget';
import { aboutWidgetConfig } from './AboutWidget';
import { imageWidgetConfig } from './ImageWidget';
import { galleryWidgetConfig } from './GalleryWidget';
import { formWidgetConfig } from './FormWidget';
import { featuresWidgetConfig } from './FeaturesWidget';
import { columnsWidgetConfig } from './ColumnsWidget';
import { menuWidgetConfig } from './MenuWidget';
import { shopWidgetConfig } from './ShopWidget';
import { dividerWidgetConfig } from './DividerWidget';
import { pageListWidgetConfig } from './PageListWidget';
import { tileWidgetConfig } from './TileWidget';
import { footerWidgetConfig } from './FooterWidget';
import { videoWidgetConfig } from './VideoWidget';
import { teamWidgetConfig } from './TeamWidget';

// Реестр всех доступных виджетов
export const widgetRegistry: WidgetRegistry[] = [
  // Базовые
  textWidgetConfig,
  headingWidgetConfig,
  buttonWidgetConfig,
  coverWidgetConfig,
  aboutWidgetConfig,
  featuresWidgetConfig,
  columnsWidgetConfig,
  dividerWidgetConfig,
  footerWidgetConfig,
  teamWidgetConfig,
  // Медиа
  imageWidgetConfig,
  galleryWidgetConfig,
  videoWidgetConfig,
  // Формы
  formWidgetConfig,
  // Навигация
  menuWidgetConfig,
  pageListWidgetConfig,
  tileWidgetConfig,
  // E-commerce
  shopWidgetConfig,
  // Макет
  gridSectionWidgetConfig,
  rowWidgetConfig,
  // Расширенные
  customCodeWidgetConfig,
  heroWidgetConfig,
];

// Функция для регистрации виджета
export function registerWidget(widget: WidgetRegistry) {
  const existingIndex = widgetRegistry.findIndex(w => w.type === widget.type);
  if (existingIndex !== -1) {
    widgetRegistry[existingIndex] = widget;
  } else {
    widgetRegistry.push(widget);
  }
}

// Получение виджета по типу
export function getWidgetByType(type: WidgetType): WidgetRegistry | undefined {
  return widgetRegistry.find(w => w.type === type);
}

// Получение всех виджетов по категории
export function getWidgetsByCategory(category: string): WidgetRegistry[] {
  return widgetRegistry.filter(w => w.category === category);
}

// Получение всех категорий
export function getWidgetCategories(): string[] {
  const categories = new Set(widgetRegistry.map(w => w.category));
  return Array.from(categories);
}
