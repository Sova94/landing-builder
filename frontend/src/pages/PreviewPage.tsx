import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEditorStore } from '@store/editorStore';
import { registerWidget } from '@components/widgets/registry';
import { TextWidget } from '@components/widgets/TextWidget';
import { HeadingWidget } from '@components/widgets/HeadingWidget';
import { ButtonWidget } from '@components/widgets/ButtonWidget';
import { HeroWidget } from '@components/widgets/HeroWidget';
import { CustomCodeWidget } from '@components/widgets/CustomCodeWidget';
import { GridSectionWidget } from '@components/widgets/GridSectionWidget';
import { RowWidget } from '@components/widgets/RowWidget';
import { CoverWidget } from '@components/widgets/CoverWidget';
import { AboutWidget } from '@components/widgets/AboutWidget';
import { ImageWidget } from '@components/widgets/ImageWidget';
import { GalleryWidget } from '@components/widgets/GalleryWidget';
import { FormWidget } from '@components/widgets/FormWidget';
import { FeaturesWidget } from '@components/widgets/FeaturesWidget';
import { ColumnsWidget } from '@components/widgets/ColumnsWidget';
import { MenuWidget } from '@components/widgets/MenuWidget';
import { ShopWidget } from '@components/widgets/ShopWidget';
import { DividerWidget } from '@components/widgets/DividerWidget';
import { PageListWidget } from '@components/widgets/PageListWidget';
import { TileWidget } from '@components/widgets/TileWidget';
import { FooterWidget } from '@components/widgets/FooterWidget';
import { VideoWidget } from '@components/widgets/VideoWidget';
import { TeamWidget } from '@components/widgets/TeamWidget';

function registerAllWidgets() {
  registerWidget(TextWidget as any);
  registerWidget(HeadingWidget as any);
  registerWidget(ButtonWidget as any);
  registerWidget(HeroWidget as any);
  registerWidget(CustomCodeWidget as any);
  registerWidget(GridSectionWidget as any);
  registerWidget(RowWidget as any);
  registerWidget(CoverWidget as any);
  registerWidget(AboutWidget as any);
  registerWidget(ImageWidget as any);
  registerWidget(GalleryWidget as any);
  registerWidget(FormWidget as any);
  registerWidget(FeaturesWidget as any);
  registerWidget(ColumnsWidget as any);
  registerWidget(MenuWidget as any);
  registerWidget(ShopWidget as any);
  registerWidget(DividerWidget as any);
  registerWidget(PageListWidget as any);
  registerWidget(TileWidget as any);
  registerWidget(FooterWidget as any);
  registerWidget(VideoWidget as any);
  registerWidget(TeamWidget as any);
}

const widgetComponents: Record<string, any> = {
  text: TextWidget,
  heading: HeadingWidget,
  button: ButtonWidget,
  hero: HeroWidget,
  customCode: CustomCodeWidget,
  gridSection: GridSectionWidget,
  row: RowWidget,
  cover: CoverWidget,
  about: AboutWidget,
  image: ImageWidget,
  gallery: GalleryWidget,
  form: FormWidget,
  features: FeaturesWidget,
  columns: ColumnsWidget,
  menu: MenuWidget,
  shop: ShopWidget,
  divider: DividerWidget,
  pageList: PageListWidget,
  tile: TileWidget,
  footer: FooterWidget,
  video: VideoWidget,
  team: TeamWidget,
};

export const PreviewPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, getProject, setProject } = useEditorStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    registerAllWidgets();
    
    if (projectId) {
      const loadedProject = getProject(projectId);
      if (loadedProject) {
        setProject(loadedProject);
      }
      setLoading(false);
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Проект не найден</h1>
          <p className="text-gray-600">Убедитесь что ссылка верная</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {project.sections?.map((section) => (
        <div
          key={section.id}
          className="w-full"
          style={{
            padding: section.style?.spacing?.padding || '60px 0',
            backgroundColor: section.style?.colors?.background || '#ffffff',
          }}
        >
          <div className="max-w-7xl mx-auto px-4">
            {section.widgets.map((widget) => {
              const WidgetComponent = widgetComponents[widget.type];
              if (!WidgetComponent) return null;
              
              return (
                <div
                  key={widget.id}
                  style={{
                    position: 'absolute',
                    left: widget.position?.x || 0,
                    top: widget.position?.y || 0,
                    width: widget.position?.width || 'auto',
                    height: widget.position?.height || 'auto',
                    zIndex: widget.position?.zIndex || 1,
                  }}
                >
                  <WidgetComponent widget={widget} isPreview={true} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};