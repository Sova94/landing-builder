import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useEditorStore } from '@store/editorStore';
import { WidgetRenderer } from './WidgetRenderer';
import { cn } from '@utils/cn';
import { Crosshair } from 'lucide-react';

interface DragState {
  isDragging: boolean;
  widgetId: string | null;
  startX: number;
  startY: number;
  startWidgetX: number;
  startWidgetY: number;
}

interface ResizeState {
  isResizing: boolean;
  widgetId: string | null;
  direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  startWidgetX?: number;
  startWidgetY?: number;
}

export const CanvasAbsolute: React.FC = () => {
  const { project, selectedWidgetId, selectWidget, updateWidgetPosition, selectedSectionId, isPreviewMode } = useEditorStore();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    widgetId: null,
    startX: 0,
    startY: 0,
    startWidgetX: 0,
    startWidgetY: 0,
  });
  const [resizeState, setResizeState] = useState<ResizeState>({
    isResizing: false,
    widgetId: null,
    direction: 'se',
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
  });
  const [showGrid, setShowGrid] = useState(true);

  const currentSection = project?.sections.find(s => s.id === selectedSectionId) || project?.sections[0];
  const widgets = currentSection?.widgets || [];

  const handleMouseDown = useCallback((e: React.MouseEvent, widgetId: string) => {
    if (e.button !== 0) return; // Только левая кнопка
    if (isPreviewMode) return; // В режиме предпросмотра нельзя перетаскивать
    
    const widget = widgets.find(w => w.id === widgetId);
    if (!widget?.position) return;

    e.stopPropagation();
    selectWidget(widgetId);

    setDragState({
      isDragging: true,
      widgetId,
      startX: e.clientX,
      startY: e.clientY,
      startWidgetX: widget.position.x,
      startWidgetY: widget.position.y,
    });
  }, [widgets, selectWidget, isPreviewMode]);

  const handleResizeStart = useCallback((e: React.MouseEvent, widgetId: string, direction: ResizeState['direction']) => {
    if (e.button !== 0) return;
    if (isPreviewMode) return; // В режиме предпросмотра нельзя изменять размер
    
    const widget = widgets.find(w => w.id === widgetId);
    if (!widget?.position) return;

    e.stopPropagation();
    e.preventDefault();

    selectWidget(widgetId);

    setResizeState({
      isResizing: true,
      widgetId,
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: widget.position.width,
      startHeight: widget.position.height,
      startWidgetX: widget.position.x,
      startWidgetY: widget.position.y,
    });
  }, [widgets, selectWidget, isPreviewMode]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isPreviewMode) return; // В режиме предпросмотра нельзя двигать

    // Перетаскивание
    if (dragState.isDragging && dragState.widgetId) {
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;
      
      updateWidgetPosition(dragState.widgetId, {
        x: Math.round(dragState.startWidgetX + deltaX),
        y: Math.round(dragState.startWidgetY + deltaY),
      });
    }

    // Изменение размера
    if (resizeState.isResizing && resizeState.widgetId) {
      const deltaX = e.clientX - resizeState.startX;
      const deltaY = e.clientY - resizeState.startY;
      
      let newWidth = resizeState.startWidth;
      let newHeight = resizeState.startHeight;
      let newX = undefined;
      let newY = undefined;

      switch (resizeState.direction) {
        case 'e':
          newWidth = Math.max(50, resizeState.startWidth + deltaX);
          break;
        case 'w':
          newWidth = Math.max(50, resizeState.startWidth - deltaX);
          newX = resizeState.startWidgetX! + deltaX;
          break;
        case 's':
          newHeight = Math.max(50, resizeState.startHeight + deltaY);
          break;
        case 'n':
          newHeight = Math.max(50, resizeState.startHeight - deltaY);
          newY = resizeState.startWidgetY! + deltaY;
          break;
        case 'se':
          newWidth = Math.max(50, resizeState.startWidth + deltaX);
          newHeight = Math.max(50, resizeState.startHeight + deltaY);
          break;
        case 'sw':
          newWidth = Math.max(50, resizeState.startWidth - deltaX);
          newHeight = Math.max(50, resizeState.startHeight + deltaY);
          newX = resizeState.startWidgetX! + deltaX;
          break;
        case 'ne':
          newWidth = Math.max(50, resizeState.startWidth + deltaX);
          newHeight = Math.max(50, resizeState.startHeight - deltaY);
          newY = resizeState.startWidgetY! + deltaY;
          break;
        case 'nw':
          newWidth = Math.max(50, resizeState.startWidth - deltaX);
          newHeight = Math.max(50, resizeState.startHeight - deltaY);
          newX = resizeState.startWidgetX! + deltaX;
          newY = resizeState.startWidgetY! + deltaY;
          break;
      }

      updateWidgetPosition(resizeState.widgetId, {
        width: Math.round(newWidth),
        height: Math.round(newHeight),
        ...(newX !== undefined && { x: Math.round(newX) }),
        ...(newY !== undefined && { y: Math.round(newY) }),
      });
    }
  }, [dragState, resizeState, updateWidgetPosition, isPreviewMode]);

  const handleMouseUp = useCallback(() => {
    setDragState(prev => ({ ...prev, isDragging: false, widgetId: null }));
    setResizeState(prev => ({ ...prev, isResizing: false, widgetId: null }));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current && !isPreviewMode) {
      selectWidget(null);
    }
  }, [selectWidget, isPreviewMode]);

  const getWidgetStyle = (widget: any) => {
    if (!widget.position) return {};
    
    return {
      position: 'absolute' as const,
      left: widget.position.x,
      top: widget.position.y,
      width: widget.position.width,
      height: widget.position.height,
      zIndex: widget.position.zIndex,
    };
  };

  const ResizeHandle: React.FC<{ direction: ResizeState['direction']; className: string }> = ({ direction, className }) => (
    <div
      className={cn(
        'absolute z-30 bg-blue-500 hover:bg-blue-600 rounded-sm',
        className
      )}
      onMouseDown={(e) => {
        if (isPreviewMode) return;
        const widget = widgets.find(w => w.id === selectedWidgetId);
        if (widget) {
          handleResizeStart(e, widget.id, direction);
        }
      }}
    />
  );

  return (
    <div className="flex-1 overflow-auto bg-gray-100 p-8">
      {/* Панель управления сеткой (только в режиме редактора) */}
      {!isPreviewMode && (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              showGrid 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            )}
          >
            <Crosshair className="w-4 h-4 inline mr-1" />
            Сетка
          </button>
        </div>
      )}

      {/* Канвас */}
      <div
        ref={canvasRef}
        onClick={handleCanvasClick}
        className={cn(
          'relative mx-auto shadow-lg',
          showGrid && !isPreviewMode && 'bg-grid'
        )}
        style={{
          width: '1200px',
          minHeight: '800px',
          background: isPreviewMode ? 'white' : undefined,
          backgroundImage: showGrid && !isPreviewMode
            ? 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)'
            : 'none',
          backgroundSize: '20px 20px',
        }}
      >
        {widgets
          .sort((a, b) => (a.position?.zIndex || 0) - (b.position?.zIndex || 0))
          .map((widget) => (
            <div
              key={widget.id}
              style={getWidgetStyle(widget)}
              onMouseDown={(e) => handleMouseDown(e, widget.id)}
              className={cn(
                'group',
                !isPreviewMode && 'cursor-move',
                selectedWidgetId === widget.id && !isPreviewMode && 'ring-2 ring-blue-500 ring-offset-2'
              )}
            >
              <WidgetRenderer
                widget={widget}
                isSelected={selectedWidgetId === widget.id}
                isPreview={isPreviewMode}
                onSelect={() => !isPreviewMode && selectWidget(widget.id)}
              />
              
              {/* Ручки изменения размера (только в режиме редактора) */}
              {selectedWidgetId === widget.id && !isPreviewMode && (
                <>
                  {/* Угловые ручки */}
                  <ResizeHandle direction="nw" className="w-3 h-3 -top-1.5 -left-1.5 cursor-nw-resize" />
                  <ResizeHandle direction="ne" className="w-3 h-3 -top-1.5 -right-1.5 cursor-ne-resize" />
                  <ResizeHandle direction="sw" className="w-3 h-3 -bottom-1.5 -left-1.5 cursor-sw-resize" />
                  <ResizeHandle direction="se" className="w-3 h-3 -bottom-1.5 -right-1.5 cursor-se-resize" />
                  
                  {/* Средние ручки */}
                  <ResizeHandle direction="n" className="w-3 h-2 -top-1 left-1/2 -translate-x-1/2 cursor-n-resize" />
                  <ResizeHandle direction="s" className="w-3 h-2 -bottom-1 left-1/2 -translate-x-1/2 cursor-s-resize" />
                  <ResizeHandle direction="w" className="w-2 h-3 -left-1 top-1/2 -translate-y-1/2 cursor-w-resize" />
                  <ResizeHandle direction="e" className="w-2 h-3 -right-1 top-1/2 -translate-y-1/2 cursor-e-resize" />
                </>
              )}
            </div>
          ))}
        
        {/* Пустое состояние (только в режиме редактора) */}
        {widgets.length === 0 && !isPreviewMode && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-4">+</div>
              <p className="text-lg">Добавьте виджеты из левой панели</p>
              <p className="text-sm mt-2">Перетаскивайте виджеты и изменяйте их размер</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
