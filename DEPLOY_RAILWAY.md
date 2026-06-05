# 🚀 Деплой на Railway (Backend + PostgreSQL)

## Шаг 1: Создать PostgreSQL на Railway

1. Откройте https://railway.app/
2. **New Project** → **New Database** → **PostgreSQL**
3. Дождитесь создания (1-2 минуты)
4. Кликните на базу → вкладка **Variables**
5. Скопируйте `DATABASE_URL` (выглядит как `postgres://postgres:password@...`)

---

## Шаг 2: Деплой Backend

### 2.1. Подключить репозиторий

1. В том же проекте Railway: **New** → **GitHub Repo**
2. Выберите репозиторий: `landing-builder`
3. **Root Directory**: `backend`

### 2.2. Настроить Variables

Добавьте следующие переменные окружения (вкладка Variables):

| Ключ | Значение |
|------|----------|
| `DATABASE_URL` | `postgres://...` (из шага 1) |
| `PORT` | `4000` |
| `JWT_SECRET` | `your-super-secret-key-12345` |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | `https://ваш-проект.vercel.app` |

### 2.3. Деплой

Railway автоматически запустит:
```bash
npm install
npm run start:prod
```

---

## Шаг 3: Настроить CORS

В файле `backend/src/main.ts` убедитесь что CORS настроен:

```typescript
app.enableCors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
});
```

---

## Шаг 4: Подключить Frontend к Backend

### 4.1. Добавить переменную на Vercel

1. Откройте Vercel Dashboard
2. Ваш проект → **Settings** → **Environment Variables**
3. Добавьте: `VITE_API_URL` = `https://ваш-backend.railway.app`

### 4.2. Обновить API клиент

В `frontend/src/services/api.ts` (или где у вас URL):

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
```

---

## Шаг 5: Проверить работу

1. Откройте `https://ваш-проект.vercel.app`
2. Зарегистрируйтесь
3. Создайте проект
4. Проверьте Console (F12) - не должно быть ошибок API

---

## 🔧 Troubleshooting

### Backend не запускается

Проверьте логи Railway:
- Railway → Project → Deployments → View Logs

### CORS ошибка

```
Access to fetch at 'https://backend.railway.app' from origin 'https://frontend.vercel.app' has been blocked by CORS policy
```

**Решение:** Добавьте `CORS_ORIGIN=https://frontend.vercel.app` в Variables на Railway

### База не подключается

Проверьте `DATABASE_URL` в Variables на Railway

### 500 ошибка при регистрации

Проверьте что миграции выполнены:
```bash
# В Railway Console
npm run typeorm migration:run
```

---

## 📋 Checklist

- [ ] PostgreSQL создан на Railway
- [ ] `DATABASE_URL` скопирован
- [ ] Backend загружен на Railway
- [ ] Все Variables добавлены
- [ ] `CORS_ORIGIN` = ваш Vercel URL
- [ ] Frontend знает URL backend (`VITE_API_URL`)
- [ ] Регистрация работает
- [ ] Проекты сохраняются

---

## 💰 Тарифы Railway

- **Hobby**: $5/месяц
- Включает 500 часов работы (достаточно для 1 проекта)
- PostgreSQL: 1GB бесплатно

---

## 🎯 Альтернативы

Если Railway не подходит:
- **Render.com** - бесплатно с ограничениями
- **Fly.io** - 3 VM бесплатно
- **Supabase** - PostgreSQL + Auth бесплатно
