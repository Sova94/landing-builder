import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@components/editor/Editor';
import { useEditorStore } from '@store/editorStore';
import { registerWidget } from '@components/widgets/registry';
import { textWidgetConfig } from '@components/widgets/TextWidget';
import { headingWidgetConfig } from '@components/widgets/HeadingWidget';
import { buttonWidgetConfig } from '@components/widgets/ButtonWidget';
import { heroWidgetConfig } from '@components/widgets/HeroWidget';
import { customCodeWidgetConfig } from '@components/widgets/CustomCodeWidget';
import { gridSectionWidgetConfig } from '@components/widgets/GridSectionWidget';
import { rowWidgetConfig } from '@components/widgets/RowWidget';
import { coverWidgetConfig } from '@components/widgets/CoverWidget';
import { aboutWidgetConfig } from '@components/widgets/AboutWidget';
import { imageWidgetConfig } from '@components/widgets/ImageWidget';
import { galleryWidgetConfig } from '@components/widgets/GalleryWidget';
import { formWidgetConfig } from '@components/widgets/FormWidget';
import { featuresWidgetConfig } from '@components/widgets/FeaturesWidget';
import { columnsWidgetConfig } from '@components/widgets/ColumnsWidget';
import { menuWidgetConfig } from '@components/widgets/MenuWidget';
import { shopWidgetConfig } from '@components/widgets/ShopWidget';
import { dividerWidgetConfig } from '@components/widgets/DividerWidget';
import { pageListWidgetConfig } from '@components/widgets/PageListWidget';
import { tileWidgetConfig } from '@components/widgets/TileWidget';
import { footerWidgetConfig } from '@components/widgets/FooterWidget';
import { videoWidgetConfig } from '@components/widgets/VideoWidget';
import { teamWidgetConfig } from '@components/widgets/TeamWidget';
import { Toaster } from 'react-hot-toast';

// Регистрация виджетов
function registerAllWidgets() {
  registerWidget(textWidgetConfig as any);
  registerWidget(headingWidgetConfig as any);
  registerWidget(buttonWidgetConfig as any);
  registerWidget(heroWidgetConfig as any);
  registerWidget(customCodeWidgetConfig as any);
  registerWidget(gridSectionWidgetConfig as any);
  registerWidget(rowWidgetConfig as any);
  registerWidget(coverWidgetConfig as any);
  registerWidget(aboutWidgetConfig as any);
  registerWidget(imageWidgetConfig as any);
  registerWidget(galleryWidgetConfig as any);
  registerWidget(formWidgetConfig as any);
  registerWidget(featuresWidgetConfig as any);
  registerWidget(columnsWidgetConfig as any);
  registerWidget(menuWidgetConfig as any);
  registerWidget(shopWidgetConfig as any);
  registerWidget(dividerWidgetConfig as any);
  registerWidget(pageListWidgetConfig as any);
  registerWidget(tileWidgetConfig as any);
  registerWidget(footerWidgetConfig as any);
  registerWidget(videoWidgetConfig as any);
  registerWidget(teamWidgetConfig as any);
}

export const EditorPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { getProject, setProject, createProject } = useEditorStore();

  useEffect(() => {
    // Регистрируем все виджеты при запуске
    registerAllWidgets();
    
    // Загружаем проект по ID
    if (projectId) {
      const project = getProject(projectId);
      if (project) {
        setProject(project);
      } else {
        // Если проект не найден, создаём новый
        const newProject = createProject('Новый сайт');
        navigate(`/editor/${newProject.id}`, { replace: true });
      }
    }
  }, [projectId]);

  return (
    <>
      <Editor />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
};
