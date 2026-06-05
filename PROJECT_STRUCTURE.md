# Структура проекта

```
landing-builder/
├── frontend/                          # React + Vite приложение
│   ├── public/                        # Статические файлы
│   ├── src/
│   │   ├── assets/                    # Изображения, шрифты
│   │   ├── components/
│   │   │   ├── common/                # Переиспользуемые UI компоненты
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Tabs.tsx
│   │   │   │   └── Tooltip.tsx
│   │   │   ├── editor/                # Компоненты редактора
│   │   │   │   ├── Editor.tsx
│   │   │   │   ├── Toolbar.tsx
│   │   │   │   ├── Canvas.tsx
│   │   │   │   ├── Section.tsx
│   │   │   │   ├── WidgetRenderer.tsx
│   │   │   │   ├── WidgetsPanel.tsx
│   │   │   │   ├── SettingsPanel.tsx
│   │   │   │   ├── LayersPanel.tsx
│   │   │   │   ├── DeviceSelector.tsx
│   │   │   │   └── ColorPicker.tsx
│   │   │   └── widgets/               # Виджеты (блоки)
│   │   │       ├── registry.ts        # Реестр виджетов
│   │   │       ├── TextWidget.tsx
│   │   │       ├── HeadingWidget.tsx
│   │   │       ├── ButtonWidget.tsx
│   │   │       ├── HeroWidget.tsx
│   │   │       └── CustomCodeWidget.tsx
│   │   ├── hooks/                     # Кастомные React хуки
│   │   ├── store/                     # Zustand хранилище
│   │   │   └── editorStore.ts
│   │   ├── services/                  # API сервисы
│   │   ├── types/                     # TypeScript типы
│   │   │   └── index.ts
│   │   ├── utils/                     # Утилиты
│   │   │   └── cn.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── Dockerfile
│
├── backend/                           # NestJS сервер
│   ├── src/
│   │   ├── modules/
│   │   │   ├── projects/              # Модуль проектов
│   │   │   │   ├── entities/
│   │   │   │   │   └── project.entity.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-project.dto.ts
│   │   │   │   │   └── update-project.dto.ts
│   │   │   │   ├── enums/
│   │   │   │   │   └── project-status.enum.ts
│   │   │   │   ├── projects.controller.ts
│   │   │   │   ├── projects.service.ts
│   │   │   │   └── projects.module.ts
│   │   │   ├── widgets/               # Модуль виджетов
│   │   │   │   ├── widget-registry.ts
│   │   │   │   ├── widgets.controller.ts
│   │   │   │   ├── widgets.service.ts
│   │   │   │   └── widgets.module.ts
│   │   │   ├── auth/                  # Модуль аутентификации
│   │   │   │   ├── entities/
│   │   │   │   │   └── user.entity.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── register.dto.ts
│   │   │   │   │   └── login.dto.ts
│   │   │   │   ├── guards/
│   │   │   │   │   └── jwt-auth.guard.ts
│   │   │   │   ├── strategies/
│   │   │   │   │   └── jwt.strategy.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.module.ts
│   │   │   ├── publish/               # Модуль публикации
│   │   │   │   ├── publish.controller.ts
│   │   │   │   ├── publish.service.ts
│   │   │   │   └── publish.module.ts
│   │   │   ├── templates/             # Модуль шаблонов
│   │   │   │   ├── entities/
│   │   │   │   │   └── template.entity.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-template.dto.ts
│   │   │   │   │   └── update-template.dto.ts
│   │   │   │   ├── templates.controller.ts
│   │   │   │   ├── templates.service.ts
│   │   │   │   └── templates.module.ts
│   │   │   └── types/
│   │   │       └── widget.type.ts
│   │   ├── common/                    # Общие компоненты
│   │   ├── config/                    # Конфигурация
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test/                          # Тесты
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── Dockerfile
│
├── templates/                         # Шаблоны лендингов
│   ├── README.md
│   └── enterprise-landing.json
│
├── snippets/                          # Сниппеты кода
│   └── README.md
│
├── docker-compose.yml                 # Docker конфигурация
├── package.json                       # Root package.json
├── README.md                          # Основная документация
├── DEVELOPER_GUIDE.md                 # Руководство разработчика
├── QUICK_START.md                     # Быстрый старт
└── PROJECT_STRUCTURE.md               # Этакая структура
```

## Ключевые директории

### Frontend

- **`components/widgets/`** - все виджеты конструктора. Каждый виджет - это отдельный модуль с компонентом и конфигурацией.
- **`components/editor/`** - компоненты визуального редактора (канвас, панели, тулбар)
- **`components/common/`** - базовые UI компоненты (кнопки, инпуты и т.д.)
- **`store/`** - глобальное состояние приложения (Zustand)
- **`types/`** - TypeScript типы и интерфейсы

### Backend

- **`modules/projects/`** - CRUD операции с проектами
- **`modules/widgets/`** - реестр и управление виджетами
- **`modules/auth/`** - аутентификация и авторизация
- **`modules/publish/`** - генерация и публикация лендингов
- **`modules/templates/`** - управление шаблонами

## Паттерны проектирования

### Frontend

1. **Compound Component** - для сложных UI компонентов
2. **Custom Hooks** - для переиспользования логики
3. **Zustand Store** - для глобального состояния
4. **Container/Presenter** - разделение логики и отображения
5. **Render Props** - для виджетов с разным рендерингом

### Backend

1. **Module-based** - модульная архитектура NestJS
2. **Service/Controller** - разделение бизнес-логики и API
3. **DTO** - валидация входных данных
4. **Entity** - работа с базой данных через TypeORM
5. **Guard/Strategy** - аутентификация и авторизация

## Поток данных

### Создание проекта

```
User → Editor → Zustand Store → API → Backend → Database
```

### Рендеринг виджета

```
Store → Editor → Section → WidgetRenderer → Widget Component → DOM
```

### Публикация

```
User → Publish API → Backend → Template Engine → HTML File → CDN
```

## Масштабирование

### Добавление нового виджета

1. Создать компонент
2. Добавить конфигурацию
3. Зарегистрировать в реестре
4. Добавить в рендерер

### Добавление нового API эндпоинта

1. Создать DTO
2. Добавить метод в Service
3. Добавить метод в Controller
4. Протестировать в Swagger

### Оптимизация производительности

1. **Code splitting** - lazy loading виджетов
2. **Memoization** - React.memo для компонентов
3. **Virtualization** - для больших списков
4. **Caching** - Redis для часто используемых данных
5. **CDN** - для статических активов
