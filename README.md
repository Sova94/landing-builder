# Landing Builder - SaaS Конструктор Лендингов 🚀

Современный визуальный конструктор лендингов уровня Tilda с поддержкой drag-and-drop, AI-помощника и пользовательского кода.

## 🎯 Начните здесь!

**Хотите быстро начать?** → [**START_HERE.md**](START_HERE.md)

**Проблемы с запуском?** → [**START_GUIDE.md**](START_GUIDE.md)

**Для разработчиков?** → [**DEVELOPER_GUIDE.md**](DEVELOPER_GUIDE.md)

## 🚀 Быстрый старт

### Автоматический запуск

**Windows (PowerShell):**
```powershell
.\start.ps1
```

**Windows (Command Prompt):**
```cmd
start.bat
```

**macOS / Linux:**
```bash
chmod +x start.sh
./start.sh
```

### Docker запуск

```bash
# Windows
start-docker.bat

# macOS / Linux
docker-compose up -d
```

### Доступ после запуска

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api

### Утилита Make (опционально)

```bash
# Показать все команды
make help

# Установка зависимостей
make install

# Запуск разработки
make dev

# Сборка для production
make build

# Docker
make docker-up
make docker-down
```

Подробная инструкция: [START_GUIDE.md](START_GUIDE.md)

## 🚀 Особенности

### Визуальный редактор
- **Drag-and-drop** перетаскивание блоков
- **Undo/Redo** история изменений
- **Автосохранение** проектов
- **Адаптивность** - просмотр для Desktop, Tablet, Mobile
- **Группировка** и организация секций

### Система виджетов
- **Текст**: Заголовки, параграфы, списки, цитаты
- **Медиа**: Изображения, галереи, видео, фоновое видео
- **Кнопки**: Одиночные, группы кнопок
- **Формы**: Обратная связь, подписка, квизы, многошаговые
- **Маркетинг**: Таймеры, отзывы, FAQ, преимущества, тарифы
- **Ecommerce**: Карточки товаров, каталог, корзина
- **Интерактив**: Аккордеон, табы, модальные окна, слайдеры
- **Custom Code**: HTML, CSS, JavaScript с Monaco Editor

### Умный редактор кода
- **Автодополнение** для HTML, CSS, JavaScript
- **Виджет-подсказки** (@form, @button, @hero и т.д.)
- **Готовые сниппеты** (hero, faq, slider, form)
- **Проверка ошибок** в реальном времени
- **Контекстные подсказки** для новичков
- **AI-помощник** для генерации блоков

### SEO и аналитика
- Настройки **Title, Description, Keywords**
- **Open Graph** и **Twitter Cards**
- Интеграция: **Google Analytics**, **Яндекс Метрика**, **Facebook Pixel**, **TikTok Pixel**

### Публикация
- Поддомен платформы
- **Собственный домен**
- **SSL** сертификат
- Мгновенная публикация

## 🏗️ Архитектура

### Frontend
- **React 18** + **TypeScript**
- **Vite** - сборка
- **Zustand** - управление состоянием
- **@dnd-kit** - drag-and-drop
- **Monaco Editor** - редактор кода
- **Tailwind CSS** - стилизация
- **Radix UI** - доступные компоненты

### Backend
- **NestJS** - фреймворк
- **TypeORM** - ORM
- **PostgreSQL** - база данных
- **JWT** - аутентификация
- **Swagger** - документация API
- **Handlebars** - генерация HTML

## 📦 Установка

### Предварительные требования
- Node.js 18+
- PostgreSQL 14+
- npm или yarn

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Настройте .env файл
npm run start:dev
```

## 🛠️ Разработка

### Добавление нового виджета

1. Создайте компонент виджета:
```typescript
// frontend/src/components/widgets/MyWidget.tsx
import React from 'react';
import type { WidgetData, WidgetType } from '@types/index';

export const MyWidget: React.FC<{ widget: WidgetData; isPreview?: boolean }> = ({ widget }) => {
  return <div>{widget.content.text}</div>;
};

export const myWidgetConfig = {
  type: 'myWidget' as WidgetType,
  name: 'Мой виджет',
  icon: 'Box',
  category: 'Категория',
  defaultData: {
    id: '',
    type: 'myWidget' as WidgetType,
    name: 'Мой виджет',
    content: { text: 'Текст' },
    style: {},
    isVisible: { desktop: true, tablet: true, mobile: true },
  },
  settingsSchema: {},
};
```

2. Зарегистрируйте виджет в `frontend/src/App.tsx`:
```typescript
import { myWidgetConfig } from '@components/widgets/MyWidget';

registerWidget(myWidgetConfig as any);
```

### Добавление нового типа виджета

1. Добавьте тип в `frontend/src/types/index.ts`:
```typescript
export type WidgetType = 
  | 'existingType'
  | 'newType'; // Добавьте новый тип
```

2. Повторите шаги для создания виджета выше.

## 📚 API Документация

Запустите backend и откройте `http://localhost:4000/api` для просмотра Swagger документации.

### Основные эндпоинты

#### Проекты
- `POST /api/projects` - Создать проект
- `GET /api/projects` - Получить все проекты
- `GET /api/projects/:id` - Получить проект
- `PATCH /api/projects/:id` - Обновить проект
- `POST /api/projects/:id/publish` - Опубликовать
- `DELETE /api/projects/:id` - Удалить

#### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход

#### Виджеты
- `GET /api/widgets` - Получить все виджеты
- `GET /api/widgets/:type` - Получить виджет по типу

#### Шаблоны
- `GET /api/templates` - Получить все шаблоны
- `GET /api/templates/:id` - Получить шаблон

## 🔐 Безопасность

- JWT аутентификация
- Валидация входных данных
- CORS защита
- Хэширование паролей (bcrypt)
- Sanitization HTML контента

## 🚀 Деплой

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist folder
```

### Backend (Docker)
```bash
docker build -t landing-builder-backend .
docker run -p 4000:4000 --env-file .env landing-builder-backend
```

## 📝 Лицензия

MIT

## 👥 Команда

NLP-Core-Team

## 🤝 Вклад

Приветствуются pull requests!
