# Быстрый старт

## 🚀 Самый быстрый способ

### Windows
```powershell
# PowerShell
.\start.ps1

# Или Command Prompt
start.bat
```

### macOS / Linux
```bash
./start.sh
```

**Всё! Проект запустится автоматически.**

## 📋 Предварительные требования
- Node.js 18+
- PostgreSQL 14+
- npm или yarn

### 1. Установка

```bash
# Клонируйте репозиторий (если используете git)
# git clone <repository-url>
# cd landing-builder

# Установите зависимости для frontend и backend
npm run install:all
```

### 2. Настройка базы данных

```bash
# Запустите PostgreSQL
# На macOS:
brew services start postgresql@15

# На Linux:
sudo systemctl start postgresql

# Создайте базу данных
createdb landing_builder
```

### 3. Настройка окружения

```bash
# Frontend
cd frontend
cp .env.example .env
# Отредактируйте .env при необходимости

# Backend
cd ../backend
cp .env.example .env
# Отредактируйте .env при необходимости
```

### 4. Запуск разработки

```bash
# Вернитесь в корень проекта
cd ..

# Запустите оба сервиса одновременно
npm run dev
```

Теперь приложение доступно:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api

## Способ 2: Docker

### Предварительные требования
- Docker
- Docker Compose

### 1. Запуск

```bash
# Скопируйте файлы окружения
cd frontend && cp .env.example .env && cd ..
cd backend && cp .env.example .env && cd ..

# Запустите все сервисы
docker-compose up -d
```

### 2. Остановка

```bash
docker-compose down
```

### 3. Просмотр логов

```bash
docker-compose logs -f
```

## Первый запуск

### 1. Регистрация пользователя

Откройте http://localhost:3000 и создайте аккаунт или используйте API:

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "Иван Иванов"
  }'
```

### 2. Создание проекта

```bash
# Используйте токен из ответа на регистрацию
TOKEN="ваш-jwt-токен"

curl -X POST http://localhost:4000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Мой первый лендинг",
    "data": {
      "sections": []
    }
  }'
```

### 3. Работа в редакторе

1. Откройте http://localhost:3000
2. Авторизуйтесь
3. Создайте новый проект
4. Добавьте виджеты из левой панели
5. Настройте виджеты в правой панели
6. Переключайте устройства для проверки адаптивности
7. Нажмите "Опубликовать" для публикации

## Проверка работы

### Backend

```bash
# Проверьте здоровье API
curl http://localhost:4000/api/health

# Получите список виджетов
curl http://localhost:4000/api/widgets
```

### Frontend

Откройте http://localhost:3000 - вы должны увидеть редактор лендингов.

## Возможные проблемы

### Порт занят

Если порт 3000 или 4000 занят:

**Frontend:**
```bash
# frontend/vite.config.ts
server: {
  port: 3001, // Измените порт
}
```

**Backend:**
```bash
# backend/.env
PORT=4001
```

### База данных не подключается

Проверьте настройки в `backend/.env`:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=ваш-пароль
DB_DATABASE=landing_builder
```

### Модули не найдены

```bash
# Удалите node_modules и установите заново
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```

## Следующие шаги

1. **Изучите готовые виджеты** - посмотрите код в `frontend/src/components/widgets/`
2. **Создайте свой виджет** - следуйте руководству в `DEVELOPER_GUIDE.md`
3. **Настройте CI/CD** - используйте примеры Dockerfile
4. **Деплойте в production** - следуйте инструкциям в README.md

## Полезные команды

```bash
# Запуск только frontend
npm run dev:frontend

# Запуск только backend
npm run dev:backend

# Сборка для production
npm run build

# Запуск production версии
npm run start

# Лinting
npm run lint
```

## Поддержка

Если у вас возникли проблемы:
- Проверьте документацию в файлах `README.md` и `DEVELOPER_GUIDE.md`
- Изучите API документацию по адресу http://localhost:4000/api
- Проверьте логи в консоли браузера и терминале
