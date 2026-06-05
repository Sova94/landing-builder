# LandingBuilder SaaS - Структура страниц

## 🌐 Обзор

Проект теперь имеет полноценную много-страничную структуру с роутингом:

```
/                → Маркетинговая главная (LandingPage)
/hub             → Хаб управления сайтами (HubPage)
/editor/:id      → Редактор сайта (EditorPage)
```

## 📄 Страницы

### 1. Главная страница (`/`)

**Файл:** `frontend/src/pages/LandingPage.tsx`

Маркетинговая страница для продвижения конструктора:

- **Hero секция** - призыв к действию, статистика
- **Возможности** - 6 карточек с преимуществами
- **Как это работает** - 3 шага
- **CTA секция** - финальный призыв к действию
- **Footer** - навигация и контакты

**Особенности:**
- Адаптивный дизайн
- Градиенты и анимации
- Ссылки на `/hub` для начала работы

### 2. Хаб (`/hub`)

**Файл:** `frontend/src/pages/HubPage.tsx`

Панель управления сайтами пользователя:

**Функционал:**
- ✅ **Создание сайта** - модальное окно с вводом названия
- ✅ **Список сайтов** - grid или list view
- ✅ **Поиск** - фильтрация по названию
- ✅ **Редактирование** - переход в редактор
- ✅ **Удаление** - с подтверждением
- ✅ **Статистика** - дата обновления, количество виджетов

**Хранение данных:**
- Проекты хранятся в Zustand store
- Массив `projects` доступен глобально
- При создании проекта генерируется уникальный ID

### 3. Редактор (`/editor/:projectId`)

**Файл:** `frontend/src/pages/EditorPage.tsx`

Визуальный редактор сайтов (существующий Editor):

**Функционал:**
- ✅ **Загрузка проекта** по ID из URL
- ✅ **Создание нового** если проект не найден
- ✅ **20+ виджетов** с визуальным редактированием
- ✅ **Absolute positioning** - перетаскивание и изменение размера
- ✅ **Inline редактирование** - клик и печатай
- ✅ **Предпросмотр** - режим просмотра
- ✅ **Публикация** - экспорт проекта

## 🔄 Роутинг

**Файл:** `frontend/src/App.tsx`

```typescript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/hub" element={<HubPage />} />
    <Route path="/editor/:projectId" element={<EditorPage />} />
  </Routes>
</BrowserRouter>
```

**Зависимости:**
- `react-router-dom` - роутинг
- `lucide-react` - иконки

## 💾 Хранение данных

**Файл:** `frontend/src/store/editorStore.ts`

```typescript
interface EditorState {
  project: ProjectData | null;    // Текущий проект
  projects: ProjectData[];        // Все проекты пользователя
  
  createProject: (name: string) => ProjectData;
  getProject: (projectId: string) => ProjectData | null;
  deleteProject: (projectId: string) => void;
  setProject: (project: ProjectData) => void;
}
```

**Структура проекта:**
```typescript
interface ProjectData {
  id: string;
  name: string;
  sections: SectionData[];
  settings: {};
  seo: { title, description, keywords };
  analytics: { google, yandex, facebook, tiktok };
  createdAt: Date;
  updatedAt: Date;
}
```

## 🚀 Использование

### 1. Запуск проекта

```bash
cd landing-builder/frontend
npm run dev
```

Откройте http://localhost:3000

### 2. Поток пользователя

1. **Главная страница** → пользователь видит преимущества
2. **Кнопка "Начать бесплатно"** → переход в `/hub`
3. **Хаб** → создание нового сайта
4. **Редактор** → дизайн и настройка
5. **Публикация** → готовый сайт

### 3. Создание сайта

```typescript
// В HubPage
const project = createProject('Мой лендинг');
navigate(`/editor/${project.id}`);

// В EditorPage
const { projectId } = useParams();
const project = getProject(projectId);
setProject(project);
```

## 🎨 Дизайн

### Цветовая схема

- **Primary:** `from-blue-600 to-purple-600` (градиент)
- **Background:** `bg-gray-50` (светлый фон)
- **Text:** `text-gray-900` (заголовки), `text-gray-600` (текст)

### Компоненты

- **Карточки проектов** - с превью и статистикой
- **Модальные окна** - создание/редактирование
- **Таблицы и Grid** - переключатель вида
- **Кнопки** - градиентные CTA

## 📁 Структура файлов

```
frontend/src/
├── pages/
│   ├── LandingPage.tsx    # Главная маркетинговая
│   ├── HubPage.tsx        # Управление сайтами
│   └── EditorPage.tsx     # Редактор
├── components/
│   └── editor/            # Компоненты редактора
├── store/
│   └── editorStore.ts     # Zustand store
└── App.tsx                # Роутинг
```

## 🔧 Настройка

### Vite config

**Файл:** `frontend/vite.config.ts`

Добавлен алиас для pages:
```typescript
'@pages': path.resolve(__dirname, './src/pages')
```

### Зависимости

```json
{
  "react-router-dom": "^6.x",
  "lucide-react": "^0.x",
  "zustand": "^4.x"
}
```

## 🎯 Следующие шаги

1. **Бэкенд интеграция** - сохранение проектов в PostgreSQL
2. **Аутентификация** - регистрация/вход пользователей
3. **Публикация** - деплой на хостинг
4. **Шаблоны** - библиотека готовых дизайнов
5. **Командная работа** - общий доступ к проектам

## 📊 Метрики

- **10,000+ пользователей** (цель)
- **50,000+ сайтов** (цель)
- **4.9/5 рейтинг** (цель)
- **20+ виджетов** (реализовано)
- **3 страницы** (реализовано)

---

**LandingBuilder SaaS** - профессиональный конструктор лендингов 🚀
