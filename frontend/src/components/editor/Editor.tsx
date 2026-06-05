import React from 'react';
import { useEditorStore } from '@store/editorStore';
import { Toolbar } from './Toolbar';
import { WidgetsPanel } from './WidgetsPanel';
import { SettingsPanel } from './SettingsPanel';
import { CanvasAbsolute } from './CanvasAbsolute';
import { LayersPanel } from './LayersPanel';
import { DeviceSelector } from './DeviceSelector';
import { cn } from '@utils/cn';

export const Editor: React.FC = () => {
  const {
    isWidgetsPanelOpen,
    isSettingsPanelOpen,
    isLayersPanelOpen,
    isPreviewMode,
    currentDevice,
  } = useEditorStore();

  return (
    <div className="editor h-screen w-screen flex flex-col bg-gray-100">
      {/* Верхняя панель */}
      <Toolbar />
      
      {/* Основная рабочая область */}
      <div className="flex-1 flex overflow-hidden">
        {/* Панель виджетов */}
        {isWidgetsPanelOpen && !isPreviewMode && (
          <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <WidgetsPanel />
          </aside>
        )}
        
        {/* Панель слоев (опционально) */}
        {isLayersPanelOpen && !isPreviewMode && (
          <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
            <LayersPanel />
          </aside>
        )}
        
        {/* Канвас */}
        <main className="flex-1 overflow-hidden">
          <CanvasAbsolute />
        </main>
        
        {/* Панель настроек */}
        {isSettingsPanelOpen && !isPreviewMode && (
          <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <SettingsPanel />
          </aside>
        )}
      </div>
    </div>
  );
};
