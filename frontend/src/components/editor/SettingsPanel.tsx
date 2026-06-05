import React, { useState } from 'react';
import { useEditorStore } from '@store/editorStore';
import { cn } from '@utils/cn';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/common/Tabs';
import { Palette, Type, Box, Image as ImageIcon, Monitor, Smartphone, Tablet, Move, Maximize2 } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { Input } from '@components/common/Input';
import { Select } from '@components/common/Select';

export const SettingsPanel: React.FC = () => {
  const { selectedWidgetId, selectedSectionId, project, updateWidget, updateWidgetPosition, bringToFront, sendToBack } = useEditorStore();
  const [activeTab, setActiveTab] = useState<'content' | 'position' | 'style' | 'responsive'>('content');

  const selectedWidget = project?.sections
    .flatMap(s => s.widgets)
    .find(w => w.id === selectedWidgetId);

  if (!selectedWidget) {
    return (
      <div className="settings-panel h-full flex items-center justify-center p-8">
        <div className="text-center text-gray-500">
          <p className="mb-2">Выберите виджет</p>
          <p className="text-sm">для редактирования настроек</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-panel h-full flex flex-col">
      {/* Заголовок */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-lg">{selectedWidget.name}</h2>
        <p className="text-sm text-gray-500">Настройки виджета</p>
      </div>

      {/* Табы */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-4 mx-4 mt-4">
          <TabsTrigger value="content">Контент</TabsTrigger>
          <TabsTrigger value="position">Позиция</TabsTrigger>
          <TabsTrigger value="style">Стили</TabsTrigger>
          <TabsTrigger value="responsive">Адаптив</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Контент */}
          <TabsContent value="content" className="space-y-4">
            {Object.entries(selectedWidget.content).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium text-gray-700 capitalize">
                  {key}
                </label>
                {typeof value === 'string' ? (
                  <Input
                    value={value}
                    onChange={(e) => updateWidget(selectedWidget.id, {
                      content: { ...selectedWidget.content, [key]: e.target.value }
                    })}
                  />
                ) : typeof value === 'boolean' ? (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateWidget(selectedWidget.id, {
                      content: { ...selectedWidget.content, [key]: e.target.checked }
                    })}
                    className="w-4 h-4"
                  />
                ) : (
                  <Input
                    value={String(value)}
                    onChange={(e) => updateWidget(selectedWidget.id, {
                      content: { ...selectedWidget.content, [key]: e.target.value }
                    })}
                  />
                )}
              </div>
            ))}
          </TabsContent>

          {/* Позиция */}
          <TabsContent value="position" className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <p className="text-sm text-blue-700">
                Перетаскивайте виджет мышью на канвасе или используйте ручки для изменения размера
              </p>
            </div>

            {selectedWidget.position && (
              <>
                {/* Координаты */}
                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2">
                    <Move className="w-4 h-4" />
                    Координаты
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">X</label>
                      <Input
                        type="number"
                        value={selectedWidget.position.x}
                        onChange={(e) => updateWidgetPosition(selectedWidget.id, { x: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Y</label>
                      <Input
                        type="number"
                        value={selectedWidget.position.y}
                        onChange={(e) => updateWidgetPosition(selectedWidget.id, { y: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                </div>

                {/* Размеры */}
                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" />
                    Размеры
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Ширина</label>
                      <Input
                        type="number"
                        value={selectedWidget.position.width}
                        onChange={(e) => updateWidgetPosition(selectedWidget.id, { width: parseInt(e.target.value) || 100 })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Высота</label>
                      <Input
                        type="number"
                        value={selectedWidget.position.height}
                        onChange={(e) => updateWidgetPosition(selectedWidget.id, { height: parseInt(e.target.value) || 100 })}
                      />
                    </div>
                  </div>
                </div>

                {/* Z-Index */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Z-Index (слой)</label>
                  <Input
                    type="number"
                    value={selectedWidget.position.zIndex}
                    onChange={(e) => updateWidgetPosition(selectedWidget.id, { zIndex: parseInt(e.target.value) || 1 })}
                  />
                  
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => bringToFront(selectedWidget.id)}
                      className="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      На передний план
                    </button>
                    <button
                      onClick={() => sendToBack(selectedWidget.id)}
                      className="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      На задний план
                    </button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Стили */}
          <TabsContent value="style" className="space-y-6">
            {/* Цвета */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-gray-500" />
                <h3 className="font-medium">Цвета</h3>
              </div>
              
              {selectedWidget.style.colors && (
                <div className="space-y-3">
                  {Object.entries(selectedWidget.style.colors).map(([key, value]) => (
                    <ColorPicker
                      key={key}
                      label={key}
                      value={value || '#000000'}
                      onChange={(color) => updateWidget(selectedWidget.id, {
                        style: {
                          ...selectedWidget.style,
                          colors: { ...selectedWidget.style.colors, [key]: color }
                        }
                      })}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Типографика */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-gray-500" />
                <h3 className="font-medium">Типографика</h3>
              </div>
              
              {selectedWidget.style.typography && (
                <div className="space-y-3">
                  {selectedWidget.style.typography.fontSize && (
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Размер шрифта</label>
                      <Input
                        value={selectedWidget.style.typography.fontSize}
                        onChange={(e) => updateWidget(selectedWidget.id, {
                          style: {
                            ...selectedWidget.style,
                            typography: { ...selectedWidget.style.typography, fontSize: e.target.value }
                          }
                        })}
                      />
                    </div>
                  )}
                  
                  {selectedWidget.style.typography.textAlign && (
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Выравнивание</label>
                      <div className="flex gap-2">
                        {['left', 'center', 'right', 'justify'].map((align) => (
                          <button
                            key={align}
                            onClick={() => updateWidget(selectedWidget.id, {
                              style: {
                                ...selectedWidget.style,
                                typography: { ...selectedWidget.style.typography, textAlign: align as any }
                              }
                            })}
                            className={cn(
                              'flex-1 py-2 text-sm border rounded',
                              selectedWidget.style.typography?.textAlign === align
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                            )}
                          >
                            {align === 'left' && 'L'}
                            {align === 'center' && 'C'}
                            {align === 'right' && 'R'}
                            {align === 'justify' && 'J'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Отступы */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-gray-500" />
                <h3 className="font-medium">Отступы</h3>
              </div>
              
              {selectedWidget.style.spacing && (
                <div className="space-y-3">
                  {selectedWidget.style.spacing.padding && (
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Внутренний отступ</label>
                      <Input
                        value={selectedWidget.style.spacing.padding}
                        onChange={(e) => updateWidget(selectedWidget.id, {
                          style: {
                            ...selectedWidget.style,
                            spacing: { ...selectedWidget.style.spacing, padding: e.target.value }
                          }
                        })}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Границы и скругления */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-gray-500" />
                <h3 className="font-medium">Границы</h3>
              </div>
              
              {selectedWidget.style.border && (
                <div className="space-y-3">
                  {selectedWidget.style.border.radius && (
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Скругление</label>
                      <Input
                        value={selectedWidget.style.border.radius}
                        onChange={(e) => updateWidget(selectedWidget.id, {
                          style: {
                            ...selectedWidget.style,
                            border: { ...selectedWidget.style.border, radius: e.target.value }
                          }
                        })}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Адаптивность */}
          <TabsContent value="responsive" className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Видимость на устройствах</h3>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    <span>Desktop</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedWidget.isVisible.desktop}
                    onChange={(e) => updateWidget(selectedWidget.id, {
                      isVisible: { ...selectedWidget.isVisible, desktop: e.target.checked }
                    })}
                    className="w-4 h-4"
                  />
                </label>
                
                <label className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tablet className="w-4 h-4" />
                    <span>Tablet</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedWidget.isVisible.tablet}
                    onChange={(e) => updateWidget(selectedWidget.id, {
                      isVisible: { ...selectedWidget.isVisible, tablet: e.target.checked }
                    })}
                    className="w-4 h-4"
                  />
                </label>
                
                <label className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    <span>Mobile</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedWidget.isVisible.mobile}
                    onChange={(e) => updateWidget(selectedWidget.id, {
                      isVisible: { ...selectedWidget.isVisible, mobile: e.target.checked }
                    })}
                    className="w-4 h-4"
                  />
                </label>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
