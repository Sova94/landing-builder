# 🚀 Начните здесь!

Добро пожаловать в **Landing Builder** - современный конструктор лендингов уровня Tilda!

## ⚡ Быстрый старт за 1 минуту

### 1. Запустите проект

**Windows:**
```powershell
.\start.ps1
```
или
```cmd
start.bat
```

**macOS / Linux:**
```bash
./start.sh
```

### 2. Откройте в браузере

- **Редактор**: http://localhost:3000
- **API Docs**: http://localhost:4000/api

### 3. Создайте свой первый лендинг

1. Зарегистрируйтесь
2. Создайте новый проект
3. Добавьте виджеты из левой панели
4. Настройте в правой панели
5. Нажмите "Опубликовать"

**Готово! 🎉**

---

## 📚 Документация

| Файл | Описание |
|------|----------|
| [START_HERE.md](START_HERE.md) | **Вы здесь** - быстрый старт |
| [START_GUIDE.md](START_GUIDE.md) | Полное руководство по запуску |
| [README.md](README.md) | Обзор проекта и технологий |
| [QUICK_START.md](QUICK_START.md) | Пошаговая инструкция |
| [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) | Для разработчиков |
| [FIRST_RUN_CHECKLIST.md](FIRST_RUN_CHECKLIST.md) | Чеклист первого запуска |

## 🎯 Что можно делать

### ✨ Визуальный редактор
- Перетаскивать блоки мышью
- Настраивать стили без кода
- Проверять адаптивность для мобильных
- Отменять/повторять действия

### 💻 Пользовательский код
- Писать свой HTML/CSS/JS
- Использовать умные подсказки
- Применять готовые сниппеты
- Получать советы AI

### 📦 Готовые виджеты
- Hero блоки
- Формы
- Кнопки
- Тексты
- Изображения
- И многое другое...

## 🔧 Способы запуска

### 1. Автоматический (рекомендуется)
```bash
# Windows
.\start.ps1

# macOS/Linux
./start.sh
```

### 2. Docker
```bash
# Windows
start-docker.bat

# macOS/Linux
docker-compose up -d
```

### 3. Make (macOS/Linux)
```bash
make help     # Показать команды
make dev      # Запустить
make build    # Собрать
```

### 4. Вручную
```bash
# Установка
npm run install:all

# Backend
cd backend && npm run start:dev

# Frontend (новый терминал)
cd frontend && npm run dev
```

## 🆘 Проблемы?

### Ничего не работает?
1. Проверьте [FIRST_RUN_CHECKLIST.md](FIRST_RUN_CHECKLIST.md)
2. Убедитесь что Node.js 18+
3. Перезапустите `start.ps1` / `start.sh`

### Порт занят?
```bash
# Windows PowerShell
Get-NetTCPConnection -LocalPort 3000 | Select-Object -ExpandProperty OwningProcess | Stop-Process -Force

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Ошибки при запуске?
```bash
# Полная переустановка
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```

## 📊 Что создано

### Frontend (React + TypeScript)
- ✅ Визуальный редактор с drag-and-drop
- ✅ Панель виджетов и настроек
- ✅ Monaco Editor для кода
- ✅ Адаптивность (Desktop/Tablet/Mobile)
- ✅ Undo/Redo история
- ✅ 5+ готовых виджетов

### Backend (NestJS + PostgreSQL)
- ✅ REST API с Swagger
- ✅ JWT аутентификация
- ✅ Генерация статических сайтов
- ✅ Система шаблонов
- ✅ Модульная архитектура

### Дополнительно
- ✅ Docker конфигурация
- ✅ Автоматические скрипты запуска
- ✅ Полная документация
- ✅ Примеры шаблонов
- ✅ Библиотека сниппетов

## 🎓 Для кого этот проект

- **Начинающие** - создавайте сайты без кода
- **Дизайнеры** - быстро прототипируйте
- **Разработчики** - расширяйте функционал
- **Агентства** - делайте лендинги для клиентов

## 📞 Поддержка

| Тип | Куда обращаться |
|-----|-----------------|
| Вопросы по запуску | [START_GUIDE.md](START_GUIDE.md) |
| Разработка виджетов | [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) |
| API документация | http://localhost:4000/api |
| Баги | Создайте issue |

## 🎯 Следующие шаги

1. ✅ Запустите проект через `start.ps1` / `start.sh`
2. ✅ Создайте тестовый лендинг
3. ✅ Изучите документацию
4. ✅ Добавьте свой виджет (по желанию)

## 🌟 Особенности

- **Без кода** - визуальный редактор
- **С кодом** - Monaco Editor с подсказками
- **Гибкость** - любой дизайн возможен
- **Скорость** - публикация за секунды
- **SEO** - все настройки из коробки
- **Аналитика** - Google, Яндекс, Facebook

---

**Готовы? Запускайте! 🚀**

```bash
.\start.ps1      # Windows
./start.sh       # macOS/Linux
```

**Удачи в создании потрясающих лендингов!** 🎨
