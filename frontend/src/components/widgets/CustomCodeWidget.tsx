import React, { useState, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import type { WidgetData, WidgetType } from '@types/index';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/Tabs';
import { AlertCircle, Lightbulb, Code2 } from 'lucide-react';

interface CustomCodeWidgetProps {
  widget: WidgetData;
  isPreview?: boolean;
  onChange?: (widget: WidgetData) => void;
}

export const CustomCodeWidget: React.FC<CustomCodeWidgetProps> = ({ 
  widget, 
  isPreview = false,
  onChange 
}) => {
  const { content, style } = widget;
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [errors, setErrors] = useState<Array<{ line: number; message: string }>>([]);
  const [compiledHTML, setCompiledHTML] = useState('');

  // Компиляция HTML + CSS для предпросмотра
  useEffect(() => {
    if (isPreview && content) {
      const html = content.html || '';
      const css = content.css || '';
      
      // Создаём полный HTML с CSS
      const fullHTML = `
        <style>${css}</style>
        ${html}
      `;
      
      setCompiledHTML(fullHTML);
    }
  }, [isPreview, content]);

  const handleEditorMount = useCallback((editor: any, monaco: any) => {
    monaco.languages.registerCompletionItemProvider('html', {
      provideCompletionItems: () => {
        return { suggestions: [] };
      },
    });
  }, []);

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (onChange && value !== undefined) {
      const newContent = { ...content, [activeTab]: value };
      onChange({ ...widget, content: newContent });
    }
  }, [activeTab, content, onChange, widget]);

  if (isPreview) {
    // Режим предпросмотра - рендерим скомпилированный HTML с CSS
    return (
      <div
        className="custom-code-preview w-full"
        dangerouslySetInnerHTML={{ __html: compiledHTML }}
      />
    );
  }

  return (
    <div className="custom-code-widget w-full">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'html' | 'css' | 'js')}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
        </TabsList>

        <TabsContent value="html">
          <Editor
            height="400px"
            language="html"
            theme="vs-dark"
            value={content.html || ''}
            onMount={handleEditorMount}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </TabsContent>

        <TabsContent value="css">
          <Editor
            height="400px"
            language="css"
            theme="vs-dark"
            value={content.css || ''}
            onMount={handleEditorMount}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </TabsContent>

        <TabsContent value="js">
          <Editor
            height="400px"
            language="javascript"
            theme="vs-dark"
            value={content.js || ''}
            onMount={handleEditorMount}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Контекстные подсказки */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 text-blue-700 mb-2">
          <Code2 className="w-4 h-4" />
          <span className="font-medium">Советы:</span>
        </div>
        <ul className="text-sm text-blue-600 space-y-1">
          <li>• Используйте @ для быстрых шаблонов виджетов</li>
          <li>• Введите 'hero', 'faq', 'slider' для готовых блоков</li>
          <li>• Для центрирования используйте display: flex</li>
          <li>• В режиме предпросмотра код будет выполняться</li>
        </ul>
      </div>
    </div>
  );
};

export const customCodeWidgetConfig = {
  type: 'customCode' as WidgetType,
  name: 'Custom Code',
  icon: 'Code2',
  category: 'Расширенные',
  defaultData: {
    id: '',
    type: 'customCode' as WidgetType,
    name: 'Custom Code',
    content: {
      html: '',
      css: '',
      js: '',
    },
    style: {},
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
  },
  settingsSchema: {
    content: {
      html: {
        type: 'code',
        label: 'HTML',
        language: 'html',
      },
      css: {
        type: 'code',
        label: 'CSS',
        language: 'css',
      },
      js: {
        type: 'code',
        label: 'JavaScript',
        language: 'javascript',
      },
    },
  },
};
