import React from 'react';
import { useEditorStore } from '@store/editorStore';
import { cn } from '@utils/cn';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Undo2,
  Redo2,
  Eye,
  EyeOff,
  Save,
  Download,
  Upload,
  Settings,
  Layers,
  Grid3x3,
  Monitor,
  Smartphone,
  Tablet,
  Play,
  Code2,
  Wand2,
  Trash2,
  Globe,
} from 'lucide-react';
import { Button } from '@components/common/Button';
import { Tooltip } from '@components/common/Tooltip';

export const Toolbar: React.FC = () => {
  const {
    undo,
    redo,
    canUndo,
    canRedo,
    togglePreviewMode,
    isPreviewMode,
    toggleSettingsPanel,
    isSettingsPanelOpen,
    toggleWidgetsPanel,
    isWidgetsPanelOpen,
    toggleLayersPanel,
    isLayersPanelOpen,
    saveProject,
    isDirty,
    project,
    selectedWidgetId,
    removeWidget,
    quickInstall,
  } = useEditorStore();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Левая часть: Логотип и название проекта */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Grid3x3 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">LandingBuilder</span>
        </div>
        
        {project && (
          <div className="h-6 w-px bg-gray-200" />
        )}
        
        {project && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{project.name}</span>
            {isDirty && (
              <span className="w-2 h-2 bg-amber-500 rounded-full" title="Есть несохраненные изменения" />
            )}
          </div>
        )}
      </div>

      {/* Центральная часть: Действия */}
      <div className="flex items-center gap-2">
        <Tooltip content="Отменить (Ctrl+Z)">
          <Button
            variant="ghost"
            size="icon"
            onClick={undo}
            disabled={!canUndo}
          >
            <Undo2 className="w-4 h-4" />
          </Button>
        </Tooltip>
        
        <Tooltip content="Повторить (Ctrl+Y)">
          <Button
            variant="ghost"
            size="icon"
            onClick={redo}
            disabled={!canRedo}
          >
            <Redo2 className="w-4 h-4" />
          </Button>
        </Tooltip>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        <Tooltip content="Быстрая установка (умное размещение)">
          <Button
            variant="primary"
            size="sm"
            onClick={() => quickInstall()}
            className="gap-2"
          >
            <Wand2 className="w-4 h-4" />
            Быстрая установка
          </Button>
        </Tooltip>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        <Tooltip content={isPreviewMode ? 'Режим редактирования' : 'Предпросмотр'}>
          <Button
            variant={isPreviewMode ? 'primary' : 'ghost'}
            size="icon"
            onClick={togglePreviewMode}
          >
            {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </Tooltip>

        <Tooltip content="Опубликовать">
          <Button variant="primary" size="sm">
            <Play className="w-4 h-4 mr-2" />
            Опубликовать
          </Button>
        </Tooltip>
      </div>

      {/* Правая часть: Панели и настройки */}
      <div className="flex items-center gap-2">
        {/* Кнопка Поделиться */}
        {project && (
          <Tooltip content="Поделиться ссылкой">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const previewUrl = `${window.location.origin}/preview/${project.id}`;
                navigator.clipboard.writeText(previewUrl);
                toast.success(`Ссылка скопирована! ${previewUrl}`, {
                  duration: 8000,
                });
              }}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              Поделиться
            </Button>
          </Tooltip>
        )}

        <Tooltip content="Виджеты">
          <Button
            variant={isWidgetsPanelOpen ? 'secondary' : 'ghost'}
            size="icon"
            onClick={toggleWidgetsPanel}
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Слои">
          <Button
            variant={isLayersPanelOpen ? 'secondary' : 'ghost'}
            size="icon"
            onClick={toggleLayersPanel}
          >
            <Layers className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Настройки">
          <Button
            variant={isSettingsPanelOpen ? 'secondary' : 'ghost'}
            size="icon"
            onClick={toggleSettingsPanel}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </Tooltip>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        <Tooltip content="Сохранить">
          <Button
            variant="ghost"
            size="icon"
            onClick={async () => {
              await saveProject();
              toast.success('Проект сохранён!', {
                icon: '💾',
              });
            }}
          >
            <Save className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Экспорт">
          <Button variant="ghost" size="icon">
            <Download className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Импорт">
          <Button variant="ghost" size="icon">
            <Upload className="w-4 h-4" />
          </Button>
        </Tooltip>
      </div>
    </header>
  );
};
