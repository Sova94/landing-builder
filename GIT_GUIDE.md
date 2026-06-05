# Git workflow

## Инициализация репозитория

```bash
cd landing-builder
git init
```

## Основные команды

### Создание новой ветки

```bash
git checkout -b feature/widget-name
```

### Добавление файлов

```bash
git add .
# или
git add frontend/src/components/widgets/NewWidget.tsx
```

### Коммит

```bash
git commit -m "feat: добавлен новый виджет Hero"
```

### Пуш в удалённый репозиторий

```bash
git remote add origin <repository-url>
git push -u origin main
```

## Конвенция коммитов

Используйте следующие префиксы:

- `feat:` - новая функция
- `fix:` - исправление бага
- `docs:` - документация
- `style:` - форматирование
- `refactor:` - рефакторинг
- `test:` - тесты
- `chore:` - обслуживание

Примеры:
- `feat: добавлен виджет формы обратной связи`
- `fix: исправлено выравнивание в Hero блоке`
- `docs: обновлён README`

## Ветвление

- `main` - основная ветка (production)
- `develop` - ветка разработки
- `feature/*` - фичи
- `bugfix/*` - исправления багов
- `hotfix/*` - срочные исправления

## Pull Request

Перед созданием PR:
1. Убедитесь, что все тесты проходят
2. Проверьте код с помощью линтера
3. Обновите документацию при необходимости
4. Напишите описание изменений
