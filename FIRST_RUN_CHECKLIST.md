# Чеклист первого запуска

## ✅ Предварительная проверка

### 1. Системные требования

- [ ] **Node.js 18+** установлен
  ```bash
  node --version
  # Должен быть v18.0.0 или выше
  ```

- [ ] **npm** установлен
  ```bash
  npm --version
  # Должен быть 8.0.0 или выше
  ```

- [ ] **PostgreSQL 14+** (опционально для dev)
  ```bash
  psql --version
  ```

- [ ] **Docker** (опционально)
  ```bash
  docker --version
  docker-compose --version
  ```

### 2. Запуск проекта

#### Вариант A: Автоматический запуск

**Windows:**
- [ ] Запустить `start.ps1` или `start.bat`

**macOS / Linux:**
- [ ] Сделать скрипт исполняемым: `chmod +x start.sh`
- [ ] Запустить: `./start.sh`

#### Вариант B: Ручной запуск

- [ ] Установить зависимости: `npm run install:all`
- [ ] Создать .env файлы
  - [ ] `frontend/.env`
  - [ ] `backend/.env`
- [ ] Запустить backend: `cd backend && npm run start:dev`
- [ ] Запустить frontend: `cd frontend && npm run dev`

### 3. Проверка работы

#### Backend
- [ ] Открыть http://localhost:4000/api
- [ ] Увидеть Swagger документацию

#### Frontend
- [ ] Открыть http://localhost:3000
- [ ] Увидеть редактор лендингов

### 4. Тестовый проект

- [ ] Зарегистрироваться в системе
- [ ] Создать новый проект
- [ ] Добавить виджет "Hero"
- [ ] Добавить виджет "Кнопка"
- [ ] Изменить текст виджета
- [ ] Проверить адаптивность (переключить Device)
- [ ] Нажать "Опубликовать"

### 5. Проверка API

#### Регистрация
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```
- [ ] Получить JWT токен

#### Создание проекта
```bash
curl -X POST http://localhost:4000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ВАШ_ТОКЕН" \
  -d '{
    "name": "Тестовый проект"
  }'
```
- [ ] Получить созданный проект

#### Получить виджеты
```bash
curl http://localhost:4000/api/widgets
```
- [ ] Получить список виджетов

## 🔧 Устранение проблем

### Проблема: Порт занят

**Решение 1:** Закрыть другие приложения на портах 3000/4000

**Решение 2:** Изменить порты
- Frontend: `frontend/vite.config.ts` → `port: 3001`
- Backend: `backend/.env` → `PORT=4001`

### Проблема: База данных не подключается

**Решение:**
1. Запустить PostgreSQL
2. Создать базу данных: `createdb landing_builder`
3. Проверить `backend/.env`

### Проблема: Модули не найдены

**Решение:**
```bash
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```

### Проблема: Ошибки TypeScript

**Решение:**
```bash
cd frontend
rm -rf node_modules/.vite
npm run dev
```

## 🎯 Следующие шаги

После успешного запуска:

1. **Изучите документацию**
   - [README.md](README.md) - обзор проекта
   - [START_GUIDE.md](START_GUIDE.md) - детальное руководство
   - [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - разработка

2. **Попробуйте функционал**
   - Создайте лендинг из шаблона
   - Настройте виджеты
   - Проверьте публикацию

3. **Расширьте проект**
   - Добавьте новый виджет
   - Настройте свой домен
   - Подключите аналитику

## 📞 Нужна помощь?

Если что-то не работает:

1. Проверьте логи в терминале
2. Проверьте консоль браузера (F12)
3. Прочитайте [START_GUIDE.md](START_GUIDE.md)
4. Создайте issue в репозитории

---

**Поздравляем! Ваш конструктор лендингов готов к работе! 🎉**
