import React from 'react';
import { useEditorStore } from '@store/editorStore';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { cn } from '@utils/cn';
import { Section } from './Section';
import { WidgetRenderer } from './WidgetRenderer';

export const Canvas: React.FC = () => {
  const {
    project,
    currentDevice,
    isPreviewMode,
    selectedWidgetId,
    selectedSectionId,
    selectWidget,
    selectSection,
  } = useEditorStore();

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Нет проекта</h2>
          <p className="text-gray-500">Создайте новый проект или загрузите существующий</p>
        </div>
      </div>
    );
  }

  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  return (
    <div className="canvas-wrapper flex justify-center">
      <div
        className={cn(
          'canvas bg-white shadow-lg transition-all duration-300',
          isPreviewMode && 'preview-mode'
        )}
        style={{
          width: deviceWidths[currentDevice],
          maxWidth: '100%',
          minHeight: '100%',
        }}
      >
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            // Обработка окончания перетаскивания
            console.log('Drag ended:', event);
          }}
        >
          <div className="sections space-y-0">
            {project.sections.map((section) => (
              <Section
                key={section.id}
                section={section}
                isSelected={selectedSectionId === section.id}
                onSelect={() => selectSection(section.id)}
              >
                <SortableContext
                  items={section.widgets.map(w => w.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="widgets space-y-0">
                    {section.widgets.map((widget) => (
                      <WidgetRenderer
                        key={widget.id}
                        widget={widget}
                        isSelected={selectedWidgetId === widget.id}
                        isPreview={isPreviewMode}
                        onSelect={() => selectWidget(widget.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </Section>
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
};
