import React from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';
import { useEditorStore } from '@store/editorStore';
import { TextEdit } from '@components/editor/TextEdit';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterWidgetProps {
  widget: WidgetData;
  ;
}

export const FooterWidget: React.FC<FooterWidgetProps> = ({ widget = false }) => {
  const { content, style } = widget;
  const { updateWidget } = useEditorStore();
  const logo = content.logo || '';
  const logoText = content.logoText || 'Логотип';
  const description = content.description || 'Описание компании';
  const columns = content.columns || [
    {
      title: 'Навигация',
      links: [
        { text: 'Главная', url: '#' },
        { text: 'О нас', url: '#about' },
        { text: 'Услуги', url: '#services' },
        { text: 'Контакты', url: '#contact' },
      ],
    },
    {
      title: 'Услуги',
      links: [
        { text: 'Веб-дизайн', url: '#' },
        { text: 'Разработка', url: '#' },
        { text: 'Маркетинг', url: '#' },
        { text: 'Поддержка', url: '#' },
      ],
    },
    {
      title: 'Контакты',
      links: [
        { text: '+7 (999) 000-00-00', url: 'tel:+79990000000', icon: 'Phone' },
        { text: 'info@example.com', url: 'mailto:info@example.com', icon: 'Mail' },
        { text: 'Москва, ул. Примерная, 1', url: '#', icon: 'MapPin' },
      ],
    },
  ];
  const socialLinks = content.socialLinks || [
    { platform: 'facebook', url: '#' },
    { platform: 'instagram', url: '#' },
    { platform: 'twitter', url: '#' },
    { platform: 'youtube', url: '#' },
  ];
  const backgroundColor = content.backgroundColor || '#1f2937';
  const textColor = content.textColor || '#ffffff';

  const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'facebook': Facebook,
    'instagram': Instagram,
    'twitter': Twitter,
    'youtube': Youtube,
  };

  const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
    'Phone': Phone,
    'Mail': Mail,
    'MapPin': MapPin,
  };

  const handleLinkChange = (colIndex: number, linkIndex: number, field: string, value: string) => {
    const newColumns = [...columns];
    newColumns[colIndex] = {
      ...newColumns[colIndex],
      links: newColumns[colIndex].links.map((link: any, i: number) => 
        i === linkIndex ? { ...link, [field]: value } : link
      ),
    };
    updateWidget(widget.id, {
      content: { ...content, columns: newColumns },
    });
  };

  const handleColumnTitleChange = (colIndex: number, value: string) => {
    const newColumns = [...columns];
    newColumns[colIndex] = { ...newColumns[colIndex], title: value };
    updateWidget(widget.id, {
      content: { ...content, columns: newColumns },
    });
  };

  return (
    <footer
      className="w-full"
      style={{ backgroundColor, color: textColor, ...style }}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Логотип и описание */}
          <div className="lg:col-span-2">
            {logo ? (
              <img src={logo} alt={logoText} className="h-10 mb-4" />
            ) : (
              <TextEdit
                value={logoText}
                onChange={(value) => updateWidget(widget.id, { content: { ...content, logoText: value } })}
                tagName="h3"
                placeholder="Логотип"
                multiline={false}
                className="text-2xl font-bold mb-4 block"
                style={{ color: textColor }}
              />
            )}
            <TextEdit
              value={description}
              onChange={(value) => updateWidget(widget.id, { content: { ...content, description: value } })}
              tagName="p"
              placeholder="Описание компании"
              multiline
              className="text-white/70 mb-6 max-w-sm block"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            />
            
            {/* Соцсети */}
            <div className="flex gap-4">
              {socialLinks.map((link: any, index: number) => {
                const IconComponent = socialIcons[link.platform] || Facebook;
                return (
                  <a
                    key={index}
                    href={link.url}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Колонки с ссылками */}
          {columns.map((column: any, colIndex: number) => (
            <div key={colIndex}>
              <TextEdit
                value={column.title}
                onChange={(value) => handleColumnTitleChange(colIndex, value)}
                tagName="h4"
                placeholder="Заголовок"
                multiline={false}
                className="font-semibold text-lg mb-4 block"
                style={{ color: textColor }}
              />
              <ul className="space-y-3">
                {column.links.map((link: any, linkIndex: number) => {
                  const IconComponent = iconComponents[link.icon];
                  return (
                    <li key={linkIndex}>
                      <div className="flex items-center gap-2">
                        {IconComponent && <IconComponent className="w-4 h-4" style={{ color: textColor }} />}
                        <TextEdit
                          value={link.text}
                          onChange={(value) => handleLinkChange(colIndex, linkIndex, 'text', value)}
                          tagName="a"
                          placeholder="Текст"
                          multiline={false}
                          className="text-white/70 hover:text-white transition-colors"
                          style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Нижняя строка */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()}{' '}
            <TextEdit
              value={logoText}
              onChange={(value) => updateWidget(widget.id, { content: { ...content, logoText: value } })}
              tagName="span"
              placeholder="Логотип"
              multiline={false}
              className=""
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
            />. Все права защищены.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const footerWidgetConfig = {
  type: 'footer' as WidgetType,
  name: 'Подвал',
  icon: 'LayoutTemplate',
  category: 'Базовые',
  defaultData: {
    id: '',
    type: 'footer' as WidgetType,
    name: 'Подвал',
    content: {
      logo: '',
      logoText: 'Логотип',
      description: 'Описание вашей компании',
      columns: [
        {
          title: 'Навигация',
          links: [
            { text: 'Главная', url: '#' },
            { text: 'О нас', url: '#about' },
            { text: 'Услуги', url: '#services' },
            { text: 'Контакты', url: '#contact' },
          ],
        },
        {
          title: 'Контакты',
          links: [
            { text: '+7 (999) 000-00-00', url: 'tel:+79990000000', icon: 'Phone' },
            { text: 'info@example.com', url: 'mailto:info@example.com', icon: 'Mail' },
          ],
        },
      ],
      socialLinks: [
        { platform: 'facebook', url: '#' },
        { platform: 'instagram', url: '#' },
        { platform: 'twitter', url: '#' },
        { platform: 'youtube', url: '#' },
      ],
      backgroundColor: '#1f2937',
      textColor: '#ffffff',
    },
    style: {},
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    position: {
      x: 0,
      y: 0,
      width: 1200,
      height: 400,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      logo: { type: 'image', label: 'Логотип' },
      logoText: { type: 'text', label: 'Текст логотипа' },
      description: { type: 'textarea', label: 'Описание' },
      columns: { type: 'array', label: 'Колонки' },
      socialLinks: { type: 'array', label: 'Соцсети' },
      backgroundColor: { type: 'color', label: 'Цвет фона' },
      textColor: { type: 'color', label: 'Цвет текста' },
    },
  },
};
