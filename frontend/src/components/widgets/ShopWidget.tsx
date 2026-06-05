import React from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';
import { ShoppingCart, Star } from 'lucide-react';

interface ShopWidgetProps {
  widget: WidgetData;
  ;
}

export const ShopWidget: React.FC<ShopWidgetProps> = ({ widget = false }) => {
  const { content, style } = widget;
  const title = content.title || 'Наши товары';
  const subtitle = content.subtitle || '';
  const products = content.products || [
    { name: 'Товар 1', price: 9990, oldPrice: 12990, image: '', rating: 4.5 },
    { name: 'Товар 2', price: 14990, oldPrice: 19990, image: '', rating: 5.0 },
    { name: 'Товар 3', price: 7990, oldPrice: 9990, image: '', rating: 4.0 },
    { name: 'Товар 4', price: 24990, oldPrice: 29990, image: '', rating: 4.8 },
  ];
  const columns = content.columns || 4;
  const buttonColor = content.buttonColor || '#3b82f6';

  return (
    <div
      className="w-full py-16 px-4"
      style={style}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600">{subtitle}</p>
            )}
          </div>
        )}

        {/* Товары */}
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {products.map((product: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              {/* Изображение */}
              <div className="aspect-square bg-gray-100 overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Товар
                  </div>
                )}
              </div>

              {/* Контент */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>

                {/* Рейтинг */}
                {product.rating && (
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                  </div>
                )}

                {/* Цена */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.oldPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  )}
                </div>

                {/* Кнопка */}
                <button
                  className="w-full py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  style={{ backgroundColor: buttonColor }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const shopWidgetConfig = {
  type: 'shop' as WidgetType,
  name: 'Магазин',
  icon: 'ShoppingCart',
  category: 'E-commerce',
  defaultData: {
    id: '',
    type: 'shop' as WidgetType,
    name: 'Магазин',
    content: {
      title: 'Наши товары',
      subtitle: 'Лучшие предложения',
      products: [
        { name: 'Товар 1', price: 9990, oldPrice: 12990, image: '', rating: 4.5 },
        { name: 'Товар 2', price: 14990, oldPrice: 19990, image: '', rating: 5.0 },
        { name: 'Товар 3', price: 7990, oldPrice: 9990, image: '', rating: 4.0 },
        { name: 'Товар 4', price: 24990, oldPrice: 29990, image: '', rating: 4.8 },
      ],
      columns: 4,
      buttonColor: '#3b82f6',
    },
    style: {
      backgroundColor: '#f9fafb',
      padding: '80px 20px',
    },
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    position: {
      x: 50,
      y: 50,
      width: 1000,
      height: 800,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      title: { type: 'text', label: 'Заголовок' },
      subtitle: { type: 'text', label: 'Подзаголовок' },
      products: { type: 'array', label: 'Товары' },
      columns: {
        type: 'select',
        label: 'Колонки',
        options: [
          { value: 2, label: '2' },
          { value: 3, label: '3' },
          { value: 4, label: '4' },
        ],
      },
      buttonColor: { type: 'color', label: 'Цвет кнопки' },
    },
  },
};
