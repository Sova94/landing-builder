import React from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';

interface FormWidgetProps {
  widget: WidgetData;
}

export const FormWidget: React.FC<FormWidgetProps> = ({ widget }) => {
  const { content, style } = widget;
  const title = content.title || 'Форма обратной связи';
  const subtitle = content.subtitle || 'Заполните форму и мы свяжемся с вами';
  const fields = content.fields || [
    { type: 'text', label: 'Имя', placeholder: 'Ваше имя', required: true },
    { type: 'email', label: 'Email', placeholder: 'email@example.com', required: true },
    { type: 'tel', label: 'Телефон', placeholder: '+7 (___) ___-__-__', required: false },
  ];
  const buttonText = content.buttonText || 'Отправить';
  const buttonColor = content.buttonColor || '#3b82f6';
  const backgroundColor = content.backgroundColor || '#ffffff';

  return (
    <div
      className="w-full py-12 px-4"
      style={style}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      <div
        className="max-w-lg mx-auto rounded-2xl shadow-xl overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Заголовок */}
        <div className="p-8 pb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          {subtitle && (
            <p className="text-gray-600">{subtitle}</p>
          )}
        </div>

        {/* Форма */}
        <form className="p-8 pt-0 space-y-5" onSubmit={(e) => e.preventDefault()}>
          {fields.map((field: any, index: number) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  style={{ resize: 'vertical' }}
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-4 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: buttonColor }}
          >
            {buttonText}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Нажима кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </form>
      </div>
    </div>
  );
};

export const formWidgetConfig = {
  type: 'form' as WidgetType,
  name: 'Форма',
  icon: 'Mail',
  category: 'Формы',
  defaultData: {
    id: '',
    type: 'form' as WidgetType,
    name: 'Форма',
    content: {
      title: 'Форма обратной связи',
      subtitle: 'Заполните форму и мы свяжемся с вами',
      fields: [
        { type: 'text', label: 'Имя', placeholder: 'Ваше имя', required: true },
        { type: 'email', label: 'Email', placeholder: 'email@example.com', required: true },
        { type: 'tel', label: 'Телефон', placeholder: '+7 (___) ___-__-__', required: false },
      ],
      buttonText: 'Отправить',
      buttonColor: '#3b82f6',
      backgroundColor: '#ffffff',
    },
    style: {
      padding: '60px 20px',
    },
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    position: {
      x: 50,
      y: 50,
      width: 600,
      height: 500,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      title: { type: 'text', label: 'Заголовок' },
      subtitle: { type: 'text', label: 'Подзаголовок' },
      fields: { type: 'array', label: 'Поля' },
      buttonText: { type: 'text', label: 'Текст кнопки' },
      buttonColor: { type: 'color', label: 'Цвет кнопки' },
      backgroundColor: { type: 'color', label: 'Цвет фона' },
    },
  },
};
