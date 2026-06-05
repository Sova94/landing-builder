import React, { useState } from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';
import { Menu, X } from 'lucide-react';

interface MenuWidgetProps {
  widget: WidgetData;
}

export const MenuWidget: React.FC<MenuWidgetProps> = ({ widget }) => {
  const { content, style } = widget;
  const logo = content.logo || '';
  const logoText = content.logoText || 'Логотип';
  const items = content.items || [
    { text: 'Главная', url: '#' },
    { text: 'О нас', url: '#about' },
    { text: 'Услуги', url: '#services' },
    { text: 'Контакты', url: '#contact' },
  ];
  const ctaButton = content.ctaButton;
  const position = content.position || 'fixed';
  const backgroundColor = content.backgroundColor || '#ffffff';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`w-full ${position === 'fixed' ? 'fixed top-0 left-0 right-0 z-50' : 'relative'}`}
      style={{ backgroundColor, ...style }}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Логотип */}
          <div className="flex-shrink-0">
            {logo ? (
              <img src={logo} alt={logoText} className="h-10 w-auto" />
            ) : (
              <span className="text-xl font-bold text-gray-900">{logoText}</span>
            )}
          </div>

          {/* Десктоп меню */}
          <div className="hidden md:flex items-center space-x-8">
            {items.map((item: any, index: number) => (
              <a
                key={index}
                href={item.url}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.text}
              </a>
            ))}
            
            {ctaButton && (
              <a
                href={ctaButton.url}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {ctaButton.text}
              </a>
            )}
          </div>

          {/* Мобильная кнопка */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {items.map((item: any, index: number) => (
              <a
                key={index}
                href={item.url}
                className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.text}
              </a>
            ))}
            
            {ctaButton && (
              <a
                href={ctaButton.url}
                className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {ctaButton.text}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export const menuWidgetConfig = {
  type: 'menu' as WidgetType,
  name: 'Меню',
  icon: 'Menu',
  category: 'Навигация',
  defaultData: {
    id: '',
    type: 'menu' as WidgetType,
    name: 'Меню',
    content: {
      logo: '',
      logoText: 'Логотип',
      items: [
        { text: 'Главная', url: '#' },
        { text: 'О нас', url: '#about' },
        { text: 'Услуги', url: '#services' },
        { text: 'Контакты', url: '#contact' },
      ],
      ctaButton: {
        text: 'Заказать',
        url: '#order',
      },
      position: 'fixed',
      backgroundColor: '#ffffff',
    },
    style: {
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    position: {
      x: 0,
      y: 0,
      width: 1200,
      height: 80,
      zIndex: 100,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      logo: { type: 'image', label: 'Логотип' },
      logoText: { type: 'text', label: 'Текст логотипа' },
      items: { type: 'array', label: 'Пункты меню' },
      ctaButton: { type: 'object', label: 'Кнопка CTA' },
      position: {
        type: 'select',
        label: 'Позиция',
        options: [
          { value: 'fixed', label: 'Фиксированное' },
          { value: 'static', label: 'Статичное' },
        ],
      },
      backgroundColor: { type: 'color', label: 'Цвет фона' },
    },
  },
};
