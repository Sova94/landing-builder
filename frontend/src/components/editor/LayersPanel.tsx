import React from 'react';
import { useEditorStore } from '@store/editorStore';
import { cn } from '@utils/cn';
import { ChevronRight, ChevronDown, Eye, EyeOff, Lock } from 'lucide-react';
import type { SectionData, WidgetData } from '@store/editorStore';

interface LayerItemProps {
  section: SectionData;
  level?: number;
}

const LayerItem: React.FC<LayerItemProps> = ({ section, level = 0 }) => {
  const {
    selectedSectionId,
    selectedWidgetId,
    selectSection,
    selectWidget,
  } = useEditorStore();
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className="layer-item">
      <div
        className={cn(
          'flex items-center gap-2 py-2 px-3 hover:bg-gray-50 cursor-pointer',
          selectedSectionId === section.id && 'bg-blue-50 text-blue-700',
        )}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={() => selectSection(section.id)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="p-0.5 hover:bg-gray-200 rounded"
        >
          {isExpanded ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
        </button>
        
        <span className="text-sm font-medium truncate">{section.name}</span>
        
        <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100">
          <button className="p-1 hover:bg-gray-200 rounded">
            <Eye className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <Lock className="w-3 h-3" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="widgets-layers">
          {section.widgets.map((widget) => (
            <WidgetLayerItem
              key={widget.id}
              widget={widget}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface WidgetLayerItemProps {
  widget: WidgetData;
  level: number;
}

const WidgetLayerItem: React.FC<WidgetLayerItemProps> = ({ widget, level }) => {
  const { selectedWidgetId, selectWidget } = useEditorStore();

  return (
    <div
      className={cn(
        'flex items-center gap-2 py-1.5 px-3 hover:bg-gray-50 cursor-pointer',
        selectedWidgetId === widget.id && 'bg-blue-50 text-blue-700',
      )}
      style={{ paddingLeft: `${level * 16 + 28}px` }}
      onClick={() => selectWidget(widget.id)}
    >
      <span className="text-sm truncate">{widget.name}</span>
      
      <div className="ml-auto flex items-center gap-1">
        <button className="p-1 hover:bg-gray-200 rounded">
          {!widget.isVisible.desktop ? (
            <EyeOff className="w-3 h-3 text-gray-400" />
          ) : (
            <Eye className="w-3 h-3 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export const LayersPanel: React.FC = () => {
  const { project } = useEditorStore();

  if (!project) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        Нет проекта
      </div>
    );
  }

  return (
    <div className="layers-panel h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-lg">Слои</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {project.sections.map((section) => (
          <LayerItem key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
};
