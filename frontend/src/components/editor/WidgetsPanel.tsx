import React, { useState } from 'react';
import { useEditorStore } from '@store/editorStore';
import { cn } from '@utils/cn';
import { Search, Grid3x3, Type, Image, Video, Mail, ShoppingCart, BarChart3, Code2, Layers, Layout, Columns } from 'lucide-react';
import { widgetRegistry, getWidgetCategories, getWidgetsByCategory } from '@components/widgets/registry';

// Иконки для категорий
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Текст': Type,
  'Макет': Layout,
  'Медиа': Image,
  'Кнопки': Grid3x3,
  'Формы': Mail,
  'Маркетинг': BarChart3,
  'Ecommerce': ShoppingCart,
  'Интерактив': Layers,
  'Расширенные': Code2,
};

export const WidgetsPanel: React.FC = () => {
  const { addWidget, selectedSectionId, project } = useEditorStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Текст');

  const categories = getWidgetCategories();

  const handleAddWidget = (widgetType: string) => {
    if (!selectedSectionId && project?.sections.length) {
      // Если секция не выбрана, добавляем в первую секцию
      addWidget(project.sections[0].id, widgetType as any);
    } else if (selectedSectionId) {
      addWidget(selectedSectionId, widgetType as any);
    }
  };

  const filteredCategories = categories.filter(category => {
    const widgets = getWidgetsByCategory(category);
    if (!searchQuery) return true;
    return widgets.some(w => 
      w.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="widgets-panel h-full flex flex-col">
      {/* Заголовок */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-lg mb-3">Виджеты</h2>
        
        {/* Поиск */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск виджетов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Список категорий */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredCategories.map((category) => {
          const widgets = getWidgetsByCategory(category);
          const CategoryIcon = categoryIcons[category] || Grid3x3;
          const isExpanded = expandedCategory === category;

          return (
            <div key={category} className="mb-4">
              {/* Заголовок категории */}
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category)}
                className="w-full flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CategoryIcon className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-sm">{category}</span>
                </div>
                <span className={cn(
                  'text-gray-400 transition-transform',
                  isExpanded && 'rotate-180'
                )}>
                  ▼
                </span>
              </button>

              {/* Виджеты категории */}
              {isExpanded && (
                <div className="grid grid-cols-2 gap-2 mt-2 pl-4">
                  {widgets.map((widget) => (
                    <button
                      key={widget.type}
                      onClick={() => handleAddWidget(widget.type)}
                      className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                    >
                      <div className="w-8 h-8 mb-2 flex items-center justify-center">
                        {/* Здесь должна быть иконка виджета */}
                        <div className="w-full h-full bg-gray-100 rounded group-hover:bg-blue-100" />
                      </div>
                      <span className="text-xs text-center text-gray-600 group-hover:text-blue-700">
                        {widget.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
