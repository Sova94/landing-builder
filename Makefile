# Landing Builder - Makefile

.PHONY: help install install-frontend install-backend dev start-backend start-frontend build lint clean docker-up docker-down

help: ## Показать это сообщение
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: install-frontend install-backend ## Установить все зависимости
	@echo "✓ Все зависимости установлены"

install-frontend: ## Установить frontend зависимости
	@echo "Установка frontend зависимостей..."
	@cd frontend && npm install

install-backend: ## Установить backend зависимости
	@echo "Установка backend зависимостей..."
	@cd backend && npm install

dev: ## Запустить оба сервиса (frontend + backend)
	@npm run dev

start-backend: ## Запустить только backend
	@cd backend && npm run start:dev

start-frontend: ## Запустить только frontend
	@cd frontend && npm run dev

build: build-frontend build-backend ## Собрать проект для production
	@echo "✓ Проект собран"

build-frontend: ## Собрать frontend
	@echo "Сборка frontend..."
	@cd frontend && npm run build

build-backend: ## Собрать backend
	@echo "Сборка backend..."
	@cd backend && npm run build

lint: lint-frontend lint-backend ## Запустить линтер
	@echo "✓ Linting завершен"

lint-frontend: ## Lint frontend
	@cd frontend && npm run lint

lint-backend: ## Lint backend
	@cd backend && npm run lint

clean: ## Очистить все node_modules
	@echo "Очистка node_modules..."
	@rm -rf node_modules frontend/node_modules backend/node_modules
	@echo "✓ Очистка завершена"

docker-up: ## Запустить Docker контейнеры
	@docker-compose up -d

docker-down: ## Остановить Docker контейнеры
	@docker-compose down

docker-logs: ## Показать логи Docker
	@docker-compose logs -f

docker-build: ## Пересобрать Docker контейнеры
	@docker-compose build

setup: ## Настроить проект (создать .env файлы)
	@echo "Настройка проекта..."
	@test -f frontend/.env || cp frontend/.env.example frontend/.env
	@test -f backend/.env || cp backend/.env.example backend/.env
	@echo "✓ Проект настроен"

test: ## Запустить тесты
	@echo "Запуск тестов..."
	@cd frontend && npm test
	@cd backend && npm test
