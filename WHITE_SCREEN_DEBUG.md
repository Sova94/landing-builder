# Диагностика белого экрана

## Шаг 1: Откройте консоль браузера

1. Откройте http://localhost:3000
2. Нажмите **F12** для открытия DevTools
3. Перейдите на вкладку **Console**
4. Посмотрите на красные ошибки

## Шаг 2: Проверьте тип ошибки

### Если ошибка "Failed to fetch" или "Network Error":
```
Frontend не может соединиться с backend
```
**Решение:**
- Убедитесь что backend запущен на http://localhost:4000
- Проверьте `frontend/.env` - должно быть `VITE_API_URL=http://localhost:4000`

### Если ошибка "Module not found" или "Cannot find module":
```
Отсутствуют зависимости
```
**Решение:**
```powershell
cd landing-builder\frontend
npm install
npm run dev
```

### Если ошибка про Zustand или Redux:
```
Проблема с state management
```
**Решение:**
- Очистите кэш Vite:
```powershell
Remove-Item -Recurse -Force frontend\node_modules\.vite
npm run dev
```

## Шаг 3: Проверьте App.tsx

Откройте `frontend/src/App.tsx` и убедитесь что:
- Все импорты корректны
- Нет синтаксических ошибок
- Компоненты определены

## Шаг 4: Пересоберите проект

```powershell
# Остановите frontend
# Ctrl+C в терминале где запущен frontend

# Очистите кэш
Remove-Item -Recurse -Force frontend\node_modules\.vite

# Перезапустите
cd landing-builder\frontend
npm run dev
```

## Шаг 5: Проверьте port

```powershell
# Проверьте занят ли порт 3000
netstat -ano | findstr :3000

# Если занят - освободите или измените порт
taskkill /PID <PID> /F
```

## Быстрые команды для диагностики

```powershell
# Проверка frontend
curl http://localhost:3000

# Проверка backend
curl http://localhost:4000/api

# Перезапуск frontend
cd landing-builder\frontend
npm run dev

# Перезапуск backend
cd landing-builder\backend
npm run start:dev
```

## Что написать если проблема не решается

Отправьте скриншот консоли браузера с ошибками (F12 → Console).
