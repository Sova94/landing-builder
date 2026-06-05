# 📤 Загрузка проекта на GitHub

## 🚀 Быстрый способ (через .bat файл)

### 1. Запустите файл

**Дважды кликните на:**
```
deploy-to-github.bat
```

### 2. Следуйте инструкциям

Скрипт сам:
- ✅ Проверит Git
- ✅ Инициализирует репозиторий
- ✅ Добавит файлы
- ✅ Создаст коммит
- ✅ Спросит URL репозитория
- ✅ Запушит на GitHub

### 3. Вставьте URL

Когда скрипт попросит:
```
URL репозитория GitHub:
```

Вставьте ссылку вида:
```
https://github.com/ВАШ_УЗЕР/landing-builder.git
```

---

## 📝 Ручной способ (если .bat не работает)

### Шаг 1. Откройте терминал

**Вариант 1 - PowerShell:**
1. Откройте папку `landing-builder`
2. В адресной строке введите `powershell`
3. Нажмите Enter

**Вариант 2 - Git Bash:**
1. Кликните правой кнопкой в папке
2. Выберите "Git Bash Here"

### Шаг 2. Выполните команды

**Копируйте по одной и вставляйте в терминал:**

```bash
cd C:\Users\PC\уроки\Новая папка\landing-builder
```

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Initial commit - Landing Builder SaaS"
```

```bash
git branch -M main
```

### Шаг 3. Создайте репозиторий на GitHub

1. Откройте https://github.com/new
2. **Repository name:** `landing-builder`
3. **Public** или **Private** (как хотите)
4. **НЕ ставьте** "Add README"
5. **НЕ ставьте** ".gitignore"
6. **НЕ ставьте** "License"
7. Нажмите **"Create repository"**

### Шаг 4. Скопируйте URL

На странице репозитория увидите:
```
https://github.com/ВАШ_УЗЕР/landing-builder.git
```

Скопируйте этот URL!

### Шаг 5. Отправьте код на GitHub

Вернитесь в терминал и выполните:

```bash
git remote add origin https://github.com/ВАШ_УЗЕР/landing-builder.git
```

*(замените ВАШ_УЗЕР на ваш логин GitHub)*

```bash
git push -u origin main
```

**Если попросит авторизацию:**
- Введите логин от GitHub
- Введите пароль (или Personal Access Token)

---

## ✅ Проверка

Откройте ваш репозиторий на GitHub:
```
https://github.com/ВАШ_УЗЕР/landing-builder
```

**Должны быть видны:**
- ✅ Папка `frontend/`
- ✅ Папка `backend/`
- ✅ Файл `DEPLOY.md`
- ✅ Файл `QUICK_START.md`

---

## 🐛 Частые проблемы

### Проблема: "Git not found"

**Решение:**
1. Установите Git: https://git-scm.com/download/win
2. Перезапустите терминал
3. Проверьте: `git --version`

### Проблема: "Authentication failed"

**Решение:**
1. Создайте Personal Access Token:
   - GitHub → Settings → Developer settings → Personal access tokens
   - Generate new token → выберите "repo"
   - Скопируйте токен
2. Используйте токен вместо пароля

### Проблема: "Remote origin already exists"

**Решение:**
```bash
git remote set-url origin https://github.com/ВАШ_УЗЕР/landing-builder.git
git push -u origin main
```

### Проблема: "Everything up-to-date" но на GitHub пусто

**Решение:**
```bash
git push -f origin main
```

---

## 🎯 Что дальше?

После загрузки на GitHub:

1. **Деплой на Vercel:**
   - https://vercel.com/new
   - Импортируйте репозиторий
   - Root Directory: `frontend`

2. **Деплой на Railway:**
   - https://railway.app/new
   - Импортируйте репозиторий
   - Root Directory: `backend`

**Смотрите:** `DEPLOY.md` для подробностей!

---

## 📞 Помощь

Если что-то не получается:
1. Проверьте что Git установлен: `git --version`
2. Проверьте что в папке есть `frontend` и `backend`
3. Попробуйте .bat файл
4. Напишите ошибку которая появляется

**Удачи!** 🚀
