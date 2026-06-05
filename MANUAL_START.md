# 🔧 Ручной запуск проекта

Если автоматические скрипты не работают, запустите проект вручную по шагам:

## Шаг 1: Проверка Node.js

Откройте PowerShell и выполните:

```powershell
node --version
npm --version
```

**Если команды не найдены** - установите Node.js с https://nodejs.org/

## Шаг 2: Перейдите в папку проекта

```powershell
cd landing-builder
```

## Шаг 3: Установите зависимости

### 3.1 Корневые зависимости
```powershell
npm install
```

### 3.2 Frontend зависимости
```powershell
cd frontend
npm install
cd ..
```

### 3.3 Backend зависимости
```powershell
cd backend
npm install
cd ..
```

## Шаг 4: Создайте .env файлы

```powershell
# Frontend
Copy-Item frontend\.env.example frontend\.env

# Backend
Copy-Item backend\.env.example backend\.env
```

## Шаг 5: Запустите Backend

Откройте **одно окно PowerShell**:

```powershell
cd backend
npm run start:dev
```

Вы должны увидеть:
```
Backend running on http://localhost:4000
API documentation: http://localhost:4000/api
```

## Шаг 6: Запустите Frontend

Откройте **второе окно PowerShell** (не закрывая первое):

```powershell
cd frontend
npm run dev
```

Вы должны увидеть:
```
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:3000/
```

## Шаг 7: Откройте в браузере

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api

---

## 🐛 Если что-то не работает

### Ошибка "Cannot find module"
```powershell
# Полная переустановка
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force frontend\node_modules
Remove-Item -Recurse -Force backend\node_modules
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

### Порт занят
```powershell
# Освободить порт 3000
Get-NetTCPConnection -LocalPort 3000 | Select-Object -ExpandProperty OwningProcess | Stop-Process -Force

# Освободить порт 4000
Get-NetTCPConnection -LocalPort 4000 | Select-Object -ExpandProperty OwningProcess | Stop-Process -Force
```

### Ошибка TypeScript
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules\.vite
npm run dev
```

### Ошибка базы данных
Убедитесь что PostgreSQL запущен и в `backend\.env` правильные настройки:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=ваш_пароль
DB_DATABASE=landing_builder
```

---

## ✅ Проверка успешного запуска

1. Backend запущен на порту 4000
2. Frontend запущен на порту 3000
3. http://localhost:3000 открывается
4. http://localhost:4000/api открывается

---

## 📞 Нужна помощь?

Сообщите:
1. Какую ошибку вы видите?
2. На каком шаге остановились?
3. Вывод команды `node --version`
4. Вывод команды `npm --version`
