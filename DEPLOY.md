# 🚀 Инструкция по деплою на Vercel + Railway

## ✅ Что уже сделано

- ✅ `frontend/vercel.json` - конфигурация для Vercel
- ✅ `frontend/.vercelignore` - игнор файлы для Vercel
- ✅ `frontend/.env.example` - пример переменных окружения

---

## 📋 Шаг 1: Создайте репозиторий на GitHub

```bash
cd landing-builder
git init
git add .
git commit -m "Initial commit - Landing Builder SaaS"
git branch -M main
```

**Создайте репозиторий на GitHub:**
1. Перейдите на https://github.com/new
2. Название: `landing-builder`
3. Visibility: Public или Private
4. **НЕ нажимайте** "Add README" (у вас уже есть файлы)
5. Нажмите "Create repository"

**Запушьте код:**
```bash
git remote add origin https://github.com/ВАШ_УЗЕР/landing-builder.git
git push -u origin main
```

---

## 🌐 Шаг 2: Деплой Frontend на Vercel

### 2.1. Зарегистрируйтесь на Vercel

1. Перейдите на https://vercel.com
2. Нажмите **"Sign Up"**
3. Выберите **"Continue with GitHub"**
4. Авторизуйтесь

### 2.2. Импортируйте проект

1. Нажмите **"Add New..."** → **"Project"**
2. В поиске найдите `landing-builder`
3. Нажмите **"Import"**

### 2.3. Настройте проект

**Framework Preset:** `Vite`

**Root Directory:** `frontend` (нажмите Edit и выберите папку)

**Build and Output Settings:**
```
Build Command: npm run build
Output Directory: dist
```

**Environment Variables:** (пока оставьте пустым)
```
VITE_API_URL
```

### 2.4. Нажмите "Deploy"

⏱️ **Время деплоя:** 2-3 минуты

**После деплоя вы получите:**
```
https://landing-builder-xxxx.vercel.app
```

---

## ⚙️ Шаг 3: Деплой Backend на Railway

### 3.1. Зарегистрируйтесь на Railway

1. Перейдите на https://railway.app
2. Нажмите **"Login"**
3. Выберите **"Continue with GitHub"**

### 3.2. Создайте PostgreSQL базу данных

1. Нажмите **"New Project"**
2. Нажмите **"New"** → **"PostgreSQL"**
3. Railway создаст БД автоматически
4. **Сохраните переменные** которые появятся:
   - `DATABASE_URL`
   - `PGHOST`
   - `PGPORT`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`

### 3.3. Разверните Backend

1. В том же проекте нажмите **"New"** → **"Start from GitHub"**
2. Выберите репозиторий `landing-builder`
3. Укажите **Root Directory:** `backend`

### 3.4. Настройте переменные окружения

В панели сервиса нажмите **"Variables"**:

```bash
NODE_ENV=production
PORT=4000
DB_HOST=${{postgres.PGHOST}}
DB_PORT=${{postgres.PGPORT}}
DB_USER=${{postgres.PGUSER}}
DB_PASSWORD=${{postgres.PGPASSWORD}}
DB_NAME=${{postgres.PGDATABASE}}
```

**Или вручную** (если нет автоматической подстановки):
```bash
NODE_ENV=production
PORT=4000
DB_HOST=postgres.railway.internal
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=ваш_пароль_от_бд
DB_NAME=postgres
```

### 3.5. Проверьте `backend/src/main.ts`

Убедитесь что порт берётся из переменных:

```typescript
const port = process.env.PORT || 4000;
await app.listen(port);
```

### 3.6. Нажмите "Deploy"

⏱️ **Время деплоя:** 3-5 минут

**После деплоя вы получите:**
```
https://landing-builder-production.up.railway.app
```

---

## 🔗 Шаг 4: Свяжите Frontend и Backend

### 4.1. Обновите переменную на Vercel

1. Перейдите в панель Vercel
2. Выберите ваш проект
3. Перейдите в **"Settings"** → **"Environment Variables"**
4. Добавьте переменную:
   ```
   Key: VITE_API_URL
   Value: https://landing-builder-production.up.railway.app/api
   ```
5. Нажмите **"Save"**

### 4.2. Пересоберите Frontend

1. Перейдите в **"Deployments"**
2. Нажмите на последний деплой
3. Нажмите **"..."** → **"Redeploy"**

---

## ✅ Шаг 5: Проверка

### 5.1. Проверьте Frontend

Откройте: `https://landing-builder-xxxx.vercel.app`

**Должно работать:**
- ✅ Главная страница
- ✅ Хаб (`/hub`)
- ✅ Редактор (`/editor/{id}`)
- ✅ Предпросмотр (`/preview/{id}`)

### 5.2. Проверьте Backend

Откройте: `https://landing-builder-production.up.railway.app/health`

**Должно вернуть:**
```json
{"status": "ok"}
```

### 5.3. Проверьте API

Откройте: `https://landing-builder-production.up.railway.app/api/projects`

**Должно вернуть:**
```json
[]
```

---

## 🎨 Дополнительно

### Кастомный домен на Vercel

1. **Settings** → **Domains**
2. **Add Domain:** `yourdomain.com`
3. **Настройте DNS** у вашего регистратора:
   ```
   Type: CNAME
   Name: @ или www
   Value: cname.vercel-dns.com
   ```

### Кастомный домен на Railway

1. **Settings** → **Domains**
2. **Add Custom Domain**
3. **Настройте A запись:**
   ```
   Type: A
   Name: @
   Value: IP_адрес_от_Railway
   ```

### Настройка CORS (если есть ошибки)

В `backend/src/main.ts`:

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://landing-builder-xxxx.vercel.app',
    'https://yourdomain.com'
  ],
  credentials: true,
});
```

---

## 🐛 Решение проблем

### Ошибка: "VITE_API_URL is not defined"

**Решение:**
1. Vercel → Settings → Environment Variables
2. Добавьте `VITE_API_URL`
3. Redeploy

### Ошибка: CORS

**Решение:**
1. Backend → Variables
2. Добавьте `CORS_ORIGIN=https://landing-builder-xxxx.vercel.app`
3. Обновите `main.ts` с правильным origin
4. Redeploy

### Ошибка: Database connection failed

**Решение:**
1. Railway → PostgreSQL → Variables
2. Скопируйте все переменные
3. Backend → Variables → Вставьте
4. Redeploy

---

## 📊 Мониторинг

### Vercel Analytics

1. **Analytics** → **Enable**
2. Смотрите посещаемость

### Railway Logs

1. **Deployments** → **Logs**
2. Смотрите логи backend в реальном времени

---

## 💰 Тарифы

### Vercel (Бесплатно)
- ✅ Неограниченные деплои
- ✅ 100 ГБ трафика в месяц
- ✅ Автоматический HTTPS

### Railway (Бесплатно)
- ✅ $5 кредитов в месяц
- ✅ PostgreSQL бесплатно
- ✅ ~500 часов работы backend

---

## 🎉 Готово!

**Ваш проект работает:**
- Frontend: `https://landing-builder-xxxx.vercel.app`
- Backend: `https://landing-builder-production.up.railway.app`

**Теперь можно:**
- ✅ Создавать сайты
- ✅ Редактировать
- ✅ Делиться ссылками `/preview/{id}`
- ✅ Сохранять проекты в БД

---

## 📞 Поддержка

Если что-то не работает:
1. Проверьте логи на Railway
2. Проверьте переменные окружения
3. Убедитесь что CORS настроен правильно

**Удачи с деплоем!** 🚀
