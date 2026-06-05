import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Типы напрямую из файла types
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

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export type WidgetType = 
  | 'text' | 'heading' | 'button' | 'hero' | 'image' | 'video' 
  | 'gallery' | 'form' | 'features' | 'team' | 'footer' 
  | 'menu' | 'pageList' | 'tile' | 'shop' | 'divider'
  | 'about' | 'columns' | 'cover' | 'customCode' | 'grid' | 'row';

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
  position?: {
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
  };
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
  settings: any;
  seo: any;
  analytics: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface HistoryState {
  past: ProjectData[];
  present: ProjectData | null;
  future: ProjectData[];
}

export interface WidgetRegistry {
  type: WidgetType;
  name: string;
  icon: string;
  category: string;
  defaultData: WidgetData;
  settingsSchema?: any;
}

import { getWidgetByType } from '@components/widgets/registry';

interface EditorState {
  // Проект
  project: ProjectData | null;
  projects: ProjectData[];
  
  // Выбранные элементы
  selectedWidgetId: string | null;
  selectedSectionId: string | null;
  
  // Режим устройства
  currentDevice: DeviceType;
  
  // Режим предпросмотра
  isPreviewMode: boolean;
  
  // История (Undo/Redo)
  history: HistoryState;
  
  // Состояние UI
  isSettingsPanelOpen: boolean;
  isWidgetsPanelOpen: boolean;
  isLayersPanelOpen: boolean;
  
  // Действия
  setProject: (project: ProjectData) => void;
  createProject: (name: string) => ProjectData;
  getProject: (projectId: string) => ProjectData | null;
  deleteProject: (projectId: string) => void;
  
  // Виджеты
  addWidget: (sectionId: string, widgetType: WidgetType, position?: { x?: number; y?: number }) => void;
  updateWidget: (widgetId: string, updates: Partial<WidgetData>) => void;
  removeWidget: (widgetId: string) => void;
  duplicateWidget: (widgetId: string) => void;
  moveWidget: (widgetId: string, toSectionId: string, position: number) => void;
  selectWidget: (widgetId: string | null) => void;
  
  // Абсолютное позиционирование
  updateWidgetPosition: (widgetId: string, position: Partial<{ x: number; y: number; width: number; height: number; zIndex: number }>) => void;
  bringToFront: (widgetId: string) => void;
  sendToBack: (widgetId: string) => void;
  
  // Секции
  addSection: (name?: string) => void;
  updateSection: (sectionId: string, updates: Partial<SectionData>) => void;
  removeSection: (sectionId: string) => void;
  moveSection: (sectionId: string, position: number) => void;
  selectSection: (sectionId: string | null) => void;
  
  // Устройство
  setDevice: (device: DeviceType) => void;
  
  // Режимы
  togglePreviewMode: () => void;
  toggleSettingsPanel: () => void;
  toggleWidgetsPanel: () => void;
  toggleLayersPanel: () => void;
  
  // Быстрая установка
  quickInstall: (widgetType?: WidgetType) => void;
  
  // История
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  
  // Сохранение
  saveProject: () => Promise<void>;
  isDirty: boolean;
  lastSavedAt: Date | null;
}

const createEmptyProject = (name: string): ProjectData => ({
  id: uuidv4(),
  name,
  sections: [{
    id: uuidv4(),
    name: 'Секция 1',
    widgets: [],
    style: {
      spacing: { padding: '60px 0' },
    },
  }],
  settings: {},
  seo: {
    title: name,
    description: '',
    keywords: [],
  },
  analytics: {
    googleAnalytics: { enabled: false, trackingId: '' },
    yandexMetrica: { enabled: false, counterId: '' },
    facebookPixel: { enabled: false, pixelId: '' },
    tiktokPixel: { enabled: false, pixelId: '' },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
});

const createInitialState = (): HistoryState => ({
  past: [],
  present: null as unknown as ProjectData,
  future: [],
});

export const useEditorStore = create<EditorState>((set, get) => ({
    // Начальное состояние
    project: null,
    projects: [],
    selectedWidgetId: null,
    selectedSectionId: null,
    currentDevice: 'desktop',
    isPreviewMode: false,
    history: createInitialState(),
    isSettingsPanelOpen: true,
    isWidgetsPanelOpen: true,
    isLayersPanelOpen: false,
    isDirty: false,
    lastSavedAt: null,
    
    // Вычисляемые свойства
    canUndo: false,
    canRedo: false,
    
    // Загрузка проектов из localStorage при инициализации
    ...(() => {
      try {
        const savedProjects = localStorage.getItem('landing-builder-projects');
        if (savedProjects) {
          const projects = JSON.parse(savedProjects);
          // Восстанавливаем даты
          projects.forEach((p: any) => {
            p.createdAt = new Date(p.createdAt);
            p.updatedAt = new Date(p.updatedAt);
          });
          return { projects };
        }
      } catch (e) {
        console.error('Failed to load projects from localStorage:', e);
      }
      return {};
    })(),
      
    // Получить проект по ID
    getProject: (projectId) => {
      const { projects, project } = get();
      return projects.find(p => p.id === projectId) || (project?.id === projectId ? project : null);
    },
    
    // Создать проект
    createProject: (name) => {
      const project = createEmptyProject(name);
      set((state) => ({
        project,
        projects: [...state.projects, project],
        selectedWidgetId: null,
        selectedSectionId: null,
        history: {
          past: [],
          present: project,
          future: [],
        },
        isDirty: false,
        canUndo: false,
        canRedo: false,
      }));
      return project;
    },
    
    // Удалить проект
    deleteProject: (projectId) => {
      set((state) => ({
        projects: state.projects.filter(p => p.id !== projectId),
        project: state.project?.id === projectId ? null : state.project,
      }));
    },
    
    // Установка проекта
    setProject: (project) => {
      set({
        project,
        history: {
          past: [],
          present: project,
          future: [],
        },
        canUndo: false,
        canRedo: false,
      });
    },
    
    // Добавление виджета
    addWidget: (sectionId, widgetType, position) => {
      const { project } = get();
      if (!project) return;
      
      const widgetTemplate = getWidgetByType(widgetType);
      
      if (!widgetTemplate) return;
      
      const newWidget: WidgetData = {
        ...JSON.parse(JSON.stringify(widgetTemplate.defaultData)),
        id: uuidv4(),
        position: {
          x: position?.x ?? 50,
          y: position?.y ?? 50,
          width: 200,
          height: 100,
          zIndex: 1,
        },
        layout: 'absolute',
      };
      
      set((state) => {
        if (!state.project) return state;
        
        const newProject = JSON.parse(JSON.stringify(state.project));
        const section = newProject.sections.find(s => s.id === sectionId);
        if (section) {
          section.widgets.push(newWidget);
        }
        
        newProject.updatedAt = new Date();
        
        const newState = {
          project: newProject,
          history: {
            past: [...state.history.past, state.history.present],
            present: newProject,
            future: [],
          },
          isDirty: true,
          canUndo: true,
          canRedo: false,
          selectedWidgetId: newWidget.id,
          selectedSectionId: sectionId,
          isSettingsPanelOpen: true,
        };
        
        // Авто-сохранение в projects массив
        const updatedProjects = state.projects.map(p => 
          p.id === newProject.id ? newProject : p
        );
        if (!updatedProjects.find(p => p.id === newProject.id)) {
          updatedProjects.push(newProject);
        }
        newState.projects = updatedProjects;
        
        return newState;
      });
    },
    
    // Обновление виджета
    updateWidget: (widgetId, updates) => {
      set((state) => {
        if (!state.project) return state;
        
        const newProject = JSON.parse(JSON.stringify(state.project));
        
        // Находим и обновляем виджет
        for (const section of newProject.sections) {
          const widget = section.widgets.find(w => w.id === widgetId);
          if (widget) {
            Object.assign(widget, updates);
            break;
          }
        }
        
        newProject.updatedAt = new Date();
        
        const newState = {
          project: newProject,
          history: {
            past: [...state.history.past, state.history.present],
            present: newProject,
            future: [],
          },
          isDirty: true,
          canUndo: true,
          canRedo: false,
        };
        
        // Авто-сохранение в projects массив
        const updatedProjects = state.projects.map(p => 
          p.id === newProject.id ? newProject : p
        );
        if (!updatedProjects.find(p => p.id === newProject.id)) {
          updatedProjects.push(newProject);
        }
        newState.projects = updatedProjects;
        
        return newState;
      });
    },
    
    // Удаление виджета
    removeWidget: (widgetId) => {
      set((state) => {
        if (!state.project) return state;
        
        const newProject = JSON.parse(JSON.stringify(state.project));
        
        for (const section of newProject.sections) {
          const index = section.widgets.findIndex(w => w.id === widgetId);
          if (index !== -1) {
            section.widgets.splice(index, 1);
            break;
          }
        }
        
        newProject.updatedAt = new Date();
        
        const newState = {
          project: newProject,
          history: {
            past: [...state.history.past, state.history.present],
            present: newProject,
            future: [],
          },
          isDirty: true,
          canUndo: true,
          canRedo: false,
          selectedWidgetId: state.selectedWidgetId === widgetId ? null : state.selectedWidgetId,
        };
        
        // Авто-сохранение в projects массив
        const updatedProjects = state.projects.map(p => 
          p.id === newProject.id ? newProject : p
        );
        if (!updatedProjects.find(p => p.id === newProject.id)) {
          updatedProjects.push(newProject);
        }
        newState.projects = updatedProjects;
        
        return newState;
      });
    },
    
    // Дублирование виджета
    duplicateWidget: (widgetId) => {
      set((state) => {
        if (!state.project) return state;
        
        const newProject = JSON.parse(JSON.stringify(state.project));
        
        for (const section of newProject.sections) {
          const index = section.widgets.findIndex(w => w.id === widgetId);
          if (index !== -1) {
            const original = section.widgets[index];
            const duplicate: WidgetData = {
              ...JSON.parse(JSON.stringify(original)),
              id: uuidv4(),
              name: `${original.name} (копия)`,
            };
            section.widgets.splice(index + 1, 0, duplicate);
            break;
          }
        }
        
        newProject.updatedAt = new Date();
        
        const newState = {
          project: newProject,
          history: {
            past: [...state.history.past, state.history.present],
            present: newProject,
            future: [],
          },
          isDirty: true,
          canUndo: true,
          canRedo: false,
        };
        
        // Авто-сохранение в projects массив
        const updatedProjects = state.projects.map(p => 
          p.id === newProject.id ? newProject : p
        );
        if (!updatedProjects.find(p => p.id === newProject.id)) {
          updatedProjects.push(newProject);
        }
        newState.projects = updatedProjects;
        
        return newState;
      });
    },
    
    // Перемещение виджета
    moveWidget: (widgetId, toSectionId, position) => {
      set((state) => {
        if (!state.project) return state;
        
        const newProject = JSON.parse(JSON.stringify(state.project));
        
        // Находим и удаляем виджет из текущей секции
        let widget: WidgetData | null = null;
        for (const section of newProject.sections) {
          const index = section.widgets.findIndex(w => w.id === widgetId);
          if (index !== -1) {
            widget = section.widgets.splice(index, 1)[0];
            break;
          }
        }
        
        // Добавляем в новую секцию
        if (widget) {
          const targetSection = newProject.sections.find(s => s.id === toSectionId);
          if (targetSection) {
            targetSection.widgets.splice(position, 0, widget);
          }
        }
        
        newProject.updatedAt = new Date();
        
        return {
          project: newProject,
          history: {
            past: [...state.history.past, state.history.present],
            present: newProject,
            future: [],
          },
          isDirty: true,
          canUndo: true,
          canRedo: false,
        };
      });
    },
    
    // Выбор виджета
    selectWidget: (widgetId) => {
      set({
        selectedWidgetId: widgetId,
        isSettingsPanelOpen: widgetId ? true : undefined,
      });
    },
    
    // Добавление секции
    addSection: (name = 'Новая секция') => {
      const { project } = get();
      if (!project) return;
      
      const newSection: SectionData = {
        id: uuidv4(),
        name,
        widgets: [],
        style: {
          spacing: { padding: '60px 0' },
        },
      };
      
      set((state) => {
        if (!state.project) return state;
        
        const newProject = JSON.parse(JSON.stringify(state.project));
        newProject.sections.push(newSection);
        newProject.updatedAt = new Date();
        
        return {
          project: newProject,
          history: {
            past: [...state.history.past, state.history.present],
            present: newProject,
            future: [],
          },
          isDirty: true,
          canUndo: true,
          canRedo: false,
          selectedSectionId: newSection.id,
        };
      });
    },
    
    // Обновление секции
    updateSection: (sectionId, updates) => {
      set((state) => {
        if (!state.project) return state;
        
        const newProject = JSON.parse(JSON.stringify(state.project));
        const section = newProject.sections.find(s => s.id === sectionId);
        if (section) {
          Object.assign(section, updates);
        }
        
        newProject.updatedAt = new Date();
        
        return {
          project: newProject,
          history: {
            past: [...state.history.past, state.history.present],
            present: newProject,
            future: [],
          },
          isDirty: true,
          canUndo: true,
          canRedo: false,
        };
      });
    },
    
    // Удаление секции
    removeSection: (sectionId) => {
      set((state) => {
        if (!state.project) return state;
        if (state.project.sections.length <= 1) return state;
        
        const newProject = JSON.parse(JSON.stringify(state.project));
        const index = newProject.sections.findIndex(s => s.id === sectionId);
        if (index !== -1) {
          newProject.sections.splice(index, 1);
        }
        
        newProject.updatedAt = new Date();
        
        return {
          project: newProject,
          history: {
            past: [...state.history.past, state.history.present],
            present: newProject,
            future: [],
          },
          isDirty: true,
          canUndo: true,
          canRedo: false,
          selectedSectionId: state.selectedSectionId === sectionId ? null : state.selectedSectionId,
        };
      });
    },
    
    // Перемещение секции
    moveSection: (sectionId, position) => {
      set((state) => {
        if (!state.project) return state;
        
        const newProject = JSON.parse(JSON.stringify(state.project));
        const index = newProject.sections.findIndex(s => s.id === sectionId);
        if (index !== -1) {
          const [section] = newProject.sections.splice(index, 1);
          newProject.sections.splice(position, 0, section);
        }
        
        newProject.updatedAt = new Date();
        
        return {
          project: newProject,
          history: {
            past: [...state.history.past, state.history.present],
            present: newProject,
            future: [],
          },
          isDirty: true,
          canUndo: true,
          canRedo: false,
        };
      });
    },
    
    // Выбор секции
    selectSection: (sectionId) => {
      set({
        selectedSectionId: sectionId,
      });
    },
    
    // Установка устройства
    setDevice: (device) => {
      set({
        currentDevice: device,
      });
    },
    
    // Переключение режимов
    togglePreviewMode: () => {
      set((state) => ({
        isPreviewMode: !state.isPreviewMode,
      }));
    },
    
    toggleSettingsPanel: () => {
      set((state) => ({
        isSettingsPanelOpen: !state.isSettingsPanelOpen,
      }));
    },
    
    toggleWidgetsPanel: () => {
      set((state) => ({
        isWidgetsPanelOpen: !state.isWidgetsPanelOpen,
      }));
    },
    
    toggleLayersPanel: () => {
      set((state) => ({
        isLayersPanelOpen: !state.isLayersPanelOpen,
      }));
    },
    
    // Undo
    undo: () => {
      const { history } = get();
      if (history.past.length === 0) return;
      
      set((state) => {
        const previous = state.history.past[state.history.past.length - 1];
        const newPast = state.history.past.slice(0, -1);
        
        if (previous) {
          return {
            project: previous,
            history: {
              past: newPast,
              present: previous,
              future: [state.history.present, ...state.history.future],
            },
            canUndo: newPast.length > 0,
            canRedo: true,
          };
        }
        
        return state;
      });
    },
    
    // Redo
    redo: () => {
      const { history } = get();
      if (history.future.length === 0) return;
      
      set((state) => {
        const next = state.history.future[0];
        const newFuture = state.history.future.slice(1);
        
        if (next) {
          return {
            project: next,
            history: {
              past: [...state.history.past, state.history.present],
              present: next,
              future: newFuture,
            },
            canUndo: true,
            canRedo: newFuture.length > 0,
          };
        }
        
        return state;
      });
    },
    
    // Сохранение
    saveProject: async () => {
      const { project, projects } = get();
      if (!project) return;
      
      // Обновляем проект в массиве projects
      const updatedProjects = projects.map(p => 
        p.id === project.id ? { ...project, updatedAt: new Date() } : p
      );
      
      // Если проект не найден в массиве (новый), добавляем его
      if (!updatedProjects.find(p => p.id === project.id)) {
        updatedProjects.push({ ...project, updatedAt: new Date() });
      }
      
      // Сохраняем в localStorage для персистентности
      try {
        localStorage.setItem('landing-builder-projects', JSON.stringify(updatedProjects));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
      
      set({
        projects: updatedProjects,
        lastSavedAt: new Date(),
        isDirty: false,
        history: {
          past: [],
          present: project,
          future: [],
        },
      });
      
      console.log('✅ Project saved:', project.id);
    },
    
    // Обновление позиции виджета
    updateWidgetPosition: (widgetId, positionUpdates) => {
      set((state) => {
        if (!state.project) return state;
        
        const newProject = JSON.parse(JSON.stringify(state.project));
        
        for (const section of newProject.sections) {
          const widget = section.widgets.find(w => w.id === widgetId);
          if (widget && widget.position) {
            widget.position = {
              ...widget.position,
              ...positionUpdates,
            };
            break;
          }
        }
        
        newProject.updatedAt = new Date();
        
        const newState = {
          project: newProject,
          isDirty: true,
        };
        
        // Авто-сохранение в projects массив
        const updatedProjects = state.projects.map(p => 
          p.id === newProject.id ? newProject : p
        );
        if (!updatedProjects.find(p => p.id === newProject.id)) {
          updatedProjects.push(newProject);
        }
        newState.projects = updatedProjects;
        
        return newState;
      });
    },
    
    // На передний план
    bringToFront: (widgetId) => {
      set((state) => {
        if (!state.project) return state;
        
        const newProject = JSON.parse(JSON.stringify(state.project));
        let maxZIndex = 0;
        
        // Находим максимальный z-index
        for (const section of newProject.sections) {
          for (const widget of section.widgets) {
            if (widget.position?.zIndex && widget.position.zIndex > maxZIndex) {
              maxZIndex = widget.position.zIndex;
            }
          }
        }
        
        // Устанавливаем виджету максимальный z-index
        for (const section of newProject.sections) {
          const widget = section.widgets.find(w => w.id === widgetId);
          if (widget && widget.position) {
            widget.position.zIndex = maxZIndex + 1;
            break;
          }
        }
        
        newProject.updatedAt = new Date();
        
        return {
          project: newProject,
          isDirty: true,
        };
      });
    },
    
    // На задний план
    sendToBack: (widgetId) => {
      set((state) => {
        if (!state.project) return state;
        
        const newProject = JSON.parse(JSON.stringify(state.project));
        let minZIndex = 9999;
        
        // Находим минимальный z-index
        for (const section of newProject.sections) {
          for (const widget of section.widgets) {
            if (widget.position?.zIndex && widget.position.zIndex < minZIndex) {
              minZIndex = widget.position.zIndex;
            }
          }
        }
        
        // Устанавливаем виджету минимальный z-index
        for (const section of newProject.sections) {
          const widget = section.widgets.find(w => w.id === widgetId);
          if (widget && widget.position) {
            widget.position.zIndex = Math.max(0, minZIndex - 1);
            break;
          }
        }
        
        newProject.updatedAt = new Date();
        
        return {
          project: newProject,
          isDirty: true,
        };
      });
    },
    
    // Быстрая установка - умное размещение виджета
    quickInstall: (widgetType) => {
      const { project, selectedWidgetId, addWidget } = get();
      if (!project || project.sections.length === 0) return;
      
      const firstSectionId = project.sections[0].id;
      const allWidgets = project.sections.flatMap(s => s.widgets);
      const widgetCount = allWidgets.length;
      
      // Определяем позицию на основе типа виджета и существующих виджетов
      const widgetPositions: Record<string, { x: number; y: number; width: number; height: number }> = {
        // Полноэкранные виджеты
        'cover': { x: 0, y: 0, width: 1200, height: 800 },
        'hero': { x: 0, y: 0, width: 1200, height: 600 },
        'menu': { x: 0, y: 0, width: 1200, height: 80 },
        'footer': { x: 0, y: widgetCount * 100, width: 1200, height: 400 },
        
        // Контентные блоки
        'about': { x: 0, y: 100, width: 1200, height: 500 },
        'features': { x: 0, y: 200, width: 1200, height: 400 },
        'team': { x: 0, y: 300, width: 1200, height: 600 },
        'gallery': { x: 0, y: 400, width: 1200, height: 500 },
        'shop': { x: 0, y: 500, width: 1200, height: 700 },
        'form': { x: 200, y: 300, width: 600, height: 500 },
        'columns': { x: 0, y: 250, width: 1200, height: 400 },
        
        // Медиа
        'video': { x: 100, y: 200, width: 800, height: 450 },
        'image': { x: 100, y: 150, width: 500, height: 400 },
        
        // Текст
        'heading': { x: 50, y: 50, width: 800, height: 100 },
        'text': { x: 50, y: 150, width: 600, height: 150 },
        'button': { x: 300, y: 250, width: 200, height: 60 },
        
        // Навигация
        'pageList': { x: 100, y: 200, width: 500, height: 400 },
        'tile': { x: 0, y: 300, width: 1200, height: 500 },
        
        // Разделители
        'divider': { x: 0, y: 100, width: 1200, height: 50 },
      };
      
      // Если тип виджета не указан, используем выбранный виджет
      if (!widgetType && selectedWidgetId) {
        const selectedWidget = allWidgets.find(w => w.id === selectedWidgetId);
        if (selectedWidget) {
          widgetType = selectedWidget.type;
        }
      }
      
      if (!widgetType) {
        // Если ничего не выбрано, добавляем обложку
        widgetType = 'cover';
      }
      
      // Получаем позицию для типа виджета или вычисляем автоматически
      const position = widgetPositions[widgetType] || {
        x: 50 + (widgetCount % 5) * 100,
        y: 100 + Math.floor(widgetCount / 5) * 150,
        width: 400,
        height: 300,
      };
      
      // Если это menu или footer, размещаем в начале или конце
      let finalY = position.y;
      if (widgetType === 'menu') {
        finalY = 0;
      } else if (widgetType === 'footer') {
        // Находим максимальную Y позицию
        const maxY = allWidgets.reduce((max, w) => {
          const widgetY = (w.position?.y || 0) + (w.position?.height || 0);
          return widgetY > max ? widgetY : max;
        }, 0);
        finalY = maxY || 800;
      }
      
      // Добавляем виджет с вычисленной позицией
      addWidget(firstSectionId, widgetType, {
        x: position.x,
        y: finalY,
      });
    },
  }));

