# Полная настройка PostgreSQL

## Вариант 1: Через Docker (Рекомендуется)

### Шаг 1: Установите Docker Desktop
1. Скачайте с: https://www.docker.com/products/docker-desktop
2. Установите и запустите Docker Desktop
3. Убедитесь что Docker Desktop запущен (иконка в трее)

### Шаг 2: Запустите PostgreSQL
```powershell
cd landing-builder
powershell -ExecutionPolicy Bypass -File setup-docker-db.ps1
```

### Шаг 3: Запустите проект
```powershell
powershell -ExecutionPolicy Bypass -File start-full.ps1
```

---

## Вариант 2: Нативная установка PostgreSQL

### Шаг 1: Установите PostgreSQL
1. Скачайте с: https://www.postgresql.org/download/windows/
2. Установите с паролем `postgres` для пользователя `postgres`

### Шаг 2: Создайте базу данных
```powershell
# Откройте командную строку
psql -U postgres

# В PostgreSQL консоли:
CREATE DATABASE landing_builder;
\q
```

### Шаг 3: Запустите проект
```powershell
cd landing-builder
powershell -ExecutionPolicy Bypass -File start.ps1
```

---

## Проверка подключения

### Проверка PostgreSQL
```powershell
# Через Docker
docker exec landing-postgres psql -U postgres -c "SELECT version();"

# Нативно
psql -U postgres -d landing_builder -c "SELECT version();"
```

### Проверка API
```powershell
# Swagger документация
Start-Process http://localhost:4000/api/docs

# Health check
curl http://localhost:4000/api/health
```

---

## Конфигурация

### backend/.env
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=landing_builder
```

### Docker PostgreSQL
- **Host:** localhost
- **Port:** 5432
- **Database:** landing_builder
- **User:** postgres
- **Password:** postgres
- **Volume:** postgres_data (персистентное хранилище)

---

## Команды управления

### Docker
```powershell
# Старт
docker start landing-postgres

# Остановка
docker stop landing-postgres

# Перезапуск
docker restart landing-postgres

# Логи
docker logs landing-postgres

# Удаление
docker rm -f landing-postgres
```

### Проект
```powershell
# Запуск с PostgreSQL
powershell -ExecutionPolicy Bypass -File start-full.ps1

# Только backend
cd backend
npm run start:dev

# Только frontend
cd frontend
npm run dev
```

---

## Решение проблем

### Ошибка: "Docker is not running"
- Запустите Docker Desktop
- Дождитесь иконки в системном трее

### Ошибка: "Connection refused"
- Убедитесь что PostgreSQL запущен
- Проверьте порт 5432 не занят ли он
- Перезапустите контейнер: `docker restart landing-postgres`

### Ошибка: "Database does not exist"
- Создайте базу: `createdb -U postgres landing_builder`
- Или через Docker: `docker exec -it landing-postgres createdb -U postgres landing_builder`

### Ошибка: "Port already in use"
- Проверьте что PostgreSQL не запущен дважды: `docker ps`
- Остановите и перезапустите: `docker restart landing-postgres`
- Или измените порт в docker-compose.yml

---

## Дополнительные настройки

### PostgreSQL GUI Tools
- **pgAdmin:** https://www.pgadmin.org/download/
- **DBeaver:** https://dbeaver.io/download/
- **DataGrip:** https://www.jetbrains.com/datagrip/

### Подключение к базе
- **Host:** localhost
- **Port:** 5432
- **Database:** landing_builder
- **Username:** postgres
- **Password:** postgres

---

## Production deployment

### Docker Compose
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_DATABASE}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
  
  backend:
    build: ./backend
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USERNAME: ${DB_USERNAME}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_DATABASE: ${DB_DATABASE}
    depends_on:
      - postgres
  
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
```

### Переменные окружения
```env
# .env.production
NODE_ENV=production
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=prod_user
DB_PASSWORD=your-secure-password
DB_DATABASE=landing_builder
JWT_SECRET=your-production-secret-key
```

---

## Полезные SQL запросы

```sql
-- Показать все таблицы
\dt

-- Показать структуру таблицы
\d users

-- Показать все проекты
SELECT id, name, status, "createdAt" FROM projects ORDER BY "createdAt" DESC;

-- Показать всех пользователей
SELECT id, email, name, "isActive" FROM users;

-- Статистика
SELECT 
  COUNT(DISTINCT userId) as total_users,
  COUNT(DISTINCT id) as total_projects
FROM projects;
```

---

**Проект полностью готов к работе с PostgreSQL! 🚀**
