// Основные типы для конструктора лендингов

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export type WidgetType = 
  | 'text'
  | 'heading'
  | 'subheading'
  | 'paragraph'
  | 'list'
  | 'quote'
  | 'image'
  | 'gallery'
  | 'video'
  | 'backgroundVideo'
  | 'button'
  | 'buttonGroup'
  | 'form'
  | 'subscribe'
  | 'quiz'
  | 'multiStepForm'
  | 'timer'
  | 'testimonials'
  | 'faq'
  | 'features'
  | 'cases'
  | 'pricing'
  | 'team'
  | 'partners'
  | 'productCard'
  | 'catalog'
  | 'cart'
  | 'order'
  | 'accordion'
  | 'tabs'
  | 'modal'
  | 'slider'
  | 'customCode'
  | 'hero'
  | 'container';

export interface WidgetStyle {
  colors?: {
    background?: string;
    text?: string;
    border?: string;
  };
  typography?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
  spacing?: {
    padding?: string;
    margin?: string;
    gap?: string;
  };
  border?: {
    radius?: string;
    width?: string;
    style?: 'none' | 'solid' | 'dashed' | 'dotted';
  };
  shadow?: {
    enabled: boolean;
    color?: string;
    blur?: string;
    offsetX?: string;
    offsetY?: string;
  };
  animation?: {
    type?: 'fadeIn' | 'slideUp' | 'zoomIn' | 'none';
    duration?: string;
    delay?: string;
  };
  backgroundImage?: {
    url?: string;
    video?: string;
    overlay?: string;
    size?: 'cover' | 'contain' | 'auto';
    position?: string;
    repeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
  };
}

export interface WidgetResponsiveSettings {
  desktop?: Partial<WidgetStyle>;
  tablet?: Partial<WidgetStyle>;
  mobile?: Partial<WidgetStyle>;
}

export interface WidgetData {
  id: string;
  type: WidgetType;
  name: string;
  content: Record<string, any>;
  style: WidgetStyle;
  isVisible: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
  // Позиционирование (для абсолютного режима)
  position?: {
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
  };
  // Режим позиционирования
  layout?: 'absolute' | 'relative' | 'grid';
}

export interface SectionData {
  id: string;
  name: string;
  widgets: WidgetData[];
  style: WidgetStyle;
}

export interface ProjectData {
  id: string;
  name: string;
  sections: SectionData[];
  settings: ProjectSettings;
  seo: SEOSettings;
  analytics: AnalyticsSettings;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  publishedUrl?: string;
}

export interface ProjectSettings {
  favicon?: string;
  customCode?: {
    head?: string;
    body?: string;
  };
  domain?: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

export interface AnalyticsSettings {
  googleAnalytics?: {
    enabled: boolean;
    trackingId: string;
  };
  yandexMetrica?: {
    enabled: boolean;
    counterId: string;
  };
  facebookPixel?: {
    enabled: boolean;
    pixelId: string;
  };
  tiktokPixel?: {
    enabled: boolean;
    pixelId: string;
  };
}

export interface HistoryState {
  past: ProjectData[];
  present: ProjectData;
  future: ProjectData[];
}

export interface WidgetRegistry {
  type: WidgetType;
  name: string;
  icon: string;
  category: string;
  defaultData: WidgetData;
  settingsSchema: Record<string, unknown>;
  renderComponent: React.ComponentType<{ widget: WidgetData; isPreview?: boolean }>;
  settingsPanel: React.ComponentType<{ widget: WidgetData; onChange: (data: WidgetData) => void }>;
}

export interface TemplateData {
  id: string;
  name: string;
  category: string;
  preview: string;
  project: ProjectData;
  tags: string[];
}

export interface CodeCompletion {
  label: string;
  kind: 'html' | 'css' | 'javascript' | 'snippet' | 'widget';
  detail: string;
  documentation?: string;
  insertText: string;
}

export interface AIRequest {
  prompt: string;
  context?: {
    projectType?: string;
    industry?: string;
    style?: string;
  };
}

export interface AIResponse {
  code: string;
  widgets: WidgetData[];
  suggestions: string[];
}
