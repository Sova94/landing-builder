import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditorStore } from '@store/editorStore';
import { cn } from '@utils/cn';
import { GripVertical, Plus, Trash2, Settings } from 'lucide-react';
import { Button } from '@components/common/Button';
import type { SectionData } from '@types/index';

interface SectionProps {
  section: SectionData;
  isSelected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  section,
  isSelected,
  onSelect,
  children,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const { updateSection, removeSection, addWidget } = useEditorStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'section relative group',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        isDragging && 'opacity-50',
      )}
      onClick={onSelect}
    >
      {/* Панель управления секцией */}
      <div className={cn(
        'section-controls absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity',
        isSelected && 'opacity-100',
      )}>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4" />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            // Открыть настройки секции
          }}
        >
          <Settings className="w-4 h-4" />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            addWidget(section.id, 'text');
          }}
        >
          <Plus className="w-4 h-4" />
        </Button>
        
        <Button
          variant="destructive"
          size="icon"
          className="h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            removeSection(section.id);
          }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Название секции */}
      <div className={cn(
        'section-label absolute top-2 left-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity',
        isSelected && 'opacity-100',
      )}>
        {section.name}
      </div>

      {/* Контент секции */}
      <section
        className="section-content min-h-[100px]"
        style={section.style}
      >
        {children}
      </section>

      {/* Зона для добавления виджета в конец секции */}
      <div
        className="add-widget-zone h-12 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
        onClick={() => addWidget(section.id, 'text')}
      >
        <div className="flex-1 border-t-2 border-dashed border-gray-300" />
        <Button variant="ghost" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Добавить виджет
        </Button>
        <div className="flex-1 border-t-2 border-dashed border-gray-300" />
      </div>
    </div>
  );
};
