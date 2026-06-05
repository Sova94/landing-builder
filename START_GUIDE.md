# Руководство по запуску

## 🚀 Быстрый запуск

### Способ 1: Автоматический запуск (рекомендуется)

#### Windows (PowerShell)
```powershell
# Запуск всего проекта (frontend + backend)
.\start.ps1

# Или только backend
.\start-backend.ps1

# Или только frontend
.\start-frontend.ps1
```

#### Windows (Command Prompt)
```cmd
# Запуск всего проекта
start.bat
```

#### macOS / Linux
```bash
# Сделайте скрипт исполняемым
chmod +x start.sh

# Запуск
./start.sh
```

### Способ 2: Вручную

#### 1. Установка зависимостей
```bash
# Root
npm run install:all

# Или по отдельности
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

#### 2. Настройка окружения
```bash
# Создайте .env файлы
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

#### 3. Запуск backend
```bash
cd backend
npm run start:dev
# Backend запустится на http://localhost:4000
```

#### 4. Запуск frontend (в новом терминале)
```bash
cd frontend
npm run dev
# Frontend запустится на http://localhost:3000
```

## 🐳 Docker запуск

### Windows
```cmd
start-docker.bat
```

### macOS / Linux
```bash
docker-compose up -d
```

### Остановка Docker
```bash
docker-compose down
```

### Просмотр логов
```bash
docker-compose logs -f
```

## 📋 Проверка работы

### Backend
Откройте браузер: http://localhost:4000/api

### Frontend
Откройте браузер: http://localhost:3000

## 🔧 Устранение проблем

### Порт занят

Если порт 3000 или 4000 занят:

**Вариант 1:** Остановите процесс
```bash
# Windows PowerShell
Get-NetTCPConnection -LocalPort 3000 | Select-Object -ExpandProperty OwningProcess | Stop-Process -Force

# macOS / Linux
lsof -ti:3000 | xargs kill -9
```

**Вариант 2:** Измените порт

Frontend: `frontend/vite.config.ts`
```typescript
server: {
  port: 3001, // Измените порт
}
```

Backend: `backend/.env`
```bash
PORT=4001
```

### База данных не подключается

Проверьте `backend/.env`:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=ваш_пароль
DB_DATABASE=landing_builder
```

Запустите PostgreSQL:
```bash
# Windows (если установлен через installer)
# Сервис должен быть запущен автоматически

# macOS (Homebrew)
brew services start postgresql@15

# Linux
sudo systemctl start postgresql
```

Создайте базу данных:
```bash
createdb landing_builder
```

### Модули не найдены

```bash
# Полная переустановка
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```

### Ошибки TypeScript

```bash
# Очистка кэша
cd frontend
rm -rf node_modules/.vite
npm run dev
```

## 🛠 Полезные команды

### Разработка
```bash
# Запуск обоих сервисов
npm run dev

# Только frontend
npm run dev:frontend

# Только backend
npm run dev:backend
```

### Сборка
```bash
# Сборка для production
npm run build

# Только frontend
npm run build:frontend

# Только backend
npm run build:backend
```

### Production
```bash
# Запуск production версии
npm run start
```

### Качество кода
```bash
# Linting
npm run lint

# Linting с исправлением
npm run lint:fix
```

## 📊 Мониторинг

### Логи backend
```bash
cd backend
npm run start:dev
```

### Логи frontend
Откройте DevTools браузера (F12) → Console

### Логи Docker
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🎯 Первый запуск после установки

1. **Запустите скрипт**
   ```bash
   .\start.ps1  # или start.bat
   ```

2. **Откройте браузер**
   - http://localhost:3000

3. **Зарегистрируйтесь**
   - Нажмите "Регистрация"
   - Введите email и пароль

4. **Создайте проект**
   - Нажмите "Новый проект"
   - Дайте имя проекту

5. **Добавьте виджеты**
   - Из левой панели перетащите виджеты на канвас
   - Настройте виджеты в правой панели

6. **Опубликуйте**
   - Нажмите "Опубликовать" в верхней панели
   - Получите ссылку на ваш лендинг

## 🆘 Поддержка

Если возникли проблемы:
1. Проверьте логи в терминале
2. Проверьте консоль браузера (F12)
3. Прочитайте `README.md`
4. Изучите `DEVELOPER_GUIDE.md`

## 📞 Контакты

При возникновении вопросов:
- Документация: `README.md`, `QUICK_START.md`
- API Docs: http://localhost:4000/api
- Issues: создайте issue в репозитории
