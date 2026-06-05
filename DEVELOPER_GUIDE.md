# Руководство разработчика

## Архитектура виджетов

### Структура виджета

Каждый виджет состоит из следующих частей:

1. **Компонент рендеринга** - отображение виджета
2. **Конфигурация** - метаданные виджета
3. **Редактор настроек** - панель управления
4. **Схема данных** - структура данных

### Создание нового виджета

#### Шаг 1: Определите тип виджета

Добавьте новый тип в `frontend/src/types/index.ts`:

```typescript
export type WidgetType = 
  | 'existingType'
  | 'myNewWidget'; // Новый тип
```

#### Шаг 2: Создайте компонент

Создайте файл `frontend/src/components/widgets/MyNewWidget.tsx`:

```typescript
import React from 'react';
import type { WidgetData, WidgetType } from '@types/index';
import { cn } from '@utils/cn';

interface MyNewWidgetProps {
  widget: WidgetData;
  isPreview?: boolean;
}

export const MyNewWidget: React.FC<MyNewWidgetProps> = ({ widget, isPreview }) => {
  const { content, style } = widget;
  
  return (
    <div 
      className={cn('my-new-widget', style.animation?.type && `animate-${style.animation.type}`)}
      style={{
        color: style.colors?.text,
        padding: style.spacing?.padding,
      }}
    >
      {content.text}
    </div>
  );
};
```

#### Шаг 3: Создайте конфигурацию

В том же файле добавьте конфигурацию:

```typescript
export const myNewWidgetConfig = {
  type: 'myNewWidget' as WidgetType,
  name: 'Мой новый виджет',
  icon: 'Box',
  category: 'Категория',
  defaultData: {
    id: '',
    type: 'myNewWidget' as WidgetType,
    name: 'Мой новый виджет',
    content: {
      text: 'Текст по умолчанию',
    },
    style: {
      colors: {
        text: '#000000',
      },
      spacing: {
        padding: '16px',
      },
    },
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
  },
  settingsSchema: {
    content: {
      text: {
        type: 'text',
        label: 'Текст',
        required: true,
      },
    },
    style: {
      colors: {
        text: {
          type: 'color',
          label: 'Цвет текста',
        },
      },
    },
  },
};
```

#### Шаг 4: Зарегистрируйте виджет

В `frontend/src/App.tsx`:

```typescript
import { myNewWidgetConfig } from '@components/widgets/MyNewWidget';

function registerAllWidgets() {
  // ... другие виджеты
  registerWidget(myNewWidgetConfig as any);
}
```

#### Шаг 5: Добавьте в рендерер

В `frontend/src/components/editor/WidgetRenderer.tsx`:

```typescript
import { MyNewWidget } from '@components/widgets/MyNewWidget';

const widgetComponents: Record<string, React.ComponentType> = {
  // ... другие виджеты
  myNewWidget: MyNewWidget,
};
```

## Система плагинов

### Регистрация виджета из внешнего модуля

```typescript
import { registerWidget } from '@components/widgets/registry';

// Внешний плагин
const externalWidget = {
  type: 'externalWidget' as WidgetType,
  name: 'Внешний виджет',
  icon: 'Box',
  category: 'Плагины',
  defaultData: { /* ... */ },
  settingsSchema: { /* ... */ },
};

registerWidget(externalWidget);
```

### Создание плагина

Создайте отдельный npm пакет:

```json
{
  "name": "landing-builder-widget-mywidget",
  "version": "1.0.0",
  "main": "dist/index.js",
  "peerDependencies": {
    "react": "^18.2.0"
  }
}
```

```typescript
// src/index.ts
export { MyWidget, myWidgetConfig } from './MyWidget';
```

## Производительность

### Ленивая загрузка виджетов

```typescript
import { lazy, Suspense } from 'react';

const HeavyWidget = lazy(() => import('./HeavyWidget'));

<Suspense fallback={<div>Загрузка...</div>}>
  <HeavyWidget widget={widget} />
</Suspense>
```

### Мемоизация компонентов

```typescript
import { memo } from 'react';

export const MyWidget = memo(({ widget }: MyWidgetProps) => {
  // Компонент
});
```

### Code splitting

```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'widget-heavy': ['heavy-widget-dependency'],
      },
    },
  },
}
```

## Тестирование

### Юнит-тесты

```typescript
// __tests__/MyWidget.test.tsx
import { render, screen } from '@testing-library/react';
import { MyWidget } from '../MyWidget';

describe('MyWidget', () => {
  it('отображает текст', () => {
    const widget = {
      content: { text: 'Тестовый текст' },
      style: {},
      isVisible: { desktop: true, tablet: true, mobile: true },
    };
    
    render(<MyWidget widget={widget} />);
    expect(screen.getByText('Тестовый текст')).toBeInTheDocument();
  });
});
```

### Интеграционные тесты

```typescript
// __tests__/editor.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Editor } from '../editor/Editor';

describe('Editor', () => {
  it('добавляет виджет', () => {
    render(<Editor />);
    
    fireEvent.click(screen.getByText('Добавить виджет'));
    expect(screen.getByText('Виджет добавлен')).toBeInTheDocument();
  });
});
```

## API Дизайн

### REST API принципы

1. **Ресурсы** - используйте существительные (`/projects`, `/widgets`)
2. **Методы** - используйте HTTP методы правильно
   - `GET` - получение
   - `POST` - создание
   - `PATCH` - обновление
   - `DELETE` - удаление
3. **Версионирование** - `/api/v1/projects`
4. **Пагинация** - `?page=1&limit=20`
5. **Фильтрация** - `?status=published`
6. **Сортировка** - `?sort=createdAt&order=desc`

### Примеры ответов

**Успешный ответ:**
```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

**Ошибка:**
```json
{
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "Проект не найден",
    "details": {}
  }
}
```

## Безопасность

### Валидация данных

```typescript
// backend/src/projects/dto/create-project.dto.ts
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsObject()
  data: Record<string, unknown>;
}
```

### Sanitization HTML

```typescript
import sanitizeHtml from 'sanitize-html';

const clean = sanitizeHtml(dirty, {
  allowedTags: ['b', 'i', 'em', 'strong', 'a'],
  allowedAttributes: {
    'a': ['href', 'target']
  }
});
```

### Rate limiting

```typescript
// backend/main.ts
import { ThrottlerModule } from '@nestjs/throttler';

imports: [
  ThrottlerModule.forRoot({
    ttl: 60000, // 60 секунд
    limit: 100, // 100 запросов
  }),
]
```

## Деплой

### Переменные окружения

**Production:**
```bash
NODE_ENV=production
DB_HOST=production-db-host
DB_PASSWORD=secure-password
JWT_SECRET=super-secret-key
FRONTEND_URL=https://yourdomain.com
```

### Health check

```typescript
// backend/src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private database: TypeOrmHealthIndicator,
  ) {}
  
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.database.pingCheck('database'),
    ]);
  }
}
```

## Мониторинг

### Логирование

```typescript
// backend/src/common/logger.service.ts
import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
  log(message: string) {
    console.log(message);
    // Отправка в внешнюю систему
  }
  
  error(message: string, trace?: string) {
    console.error(message, trace);
    // Отправка в Sentry/LogRocket
  }
}
```

### Метрики

```typescript
// Prometheus metrics
import { Counter, Histogram } from 'prom-client';

const requestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'path', 'status'],
});
```

## Поддержка браузеров

**Поддерживаемые браузеры:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Polyfills:**
```typescript
// frontend/src/polyfills.ts
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

## Чеклист перед релизом

- [ ] Все тесты проходят
- [ ] Линтер не показывает ошибок
- [ ] Документация обновлена
- [ ] Переменные окружения настроены
- [ ] SSL сертификаты установлены
- [ ] Бэкапы настроены
- [ ] Мониторинг подключен
- [ ] Rate limiting включен
- [ ] CORS настроен
- [ ] Health check работает
