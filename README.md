# Task Manager

Веб-приложение для управления задачами.

## Стек
- **Backend:** Python, Flask
- **Frontend:** React, TypeScript, MUI

## Запуск локально

### Backend
cd backend
pip install -r requirements.txt
python app.py
# http://localhost:8000

### Frontend
cd frontend
npm install
npm run dev
# http://localhost:5173

### Тесты
cd frontend
npx vitest

## Запуск через Docker
docker-compose up --build
# Приложение: http://localhost:3000
# API: http://localhost:8000

## API эндпоинты
- GET /tasks — все задачи (фильтрация по дате, сортировка)
- GET /tasks/today — задачи на сегодня
- GET /tasks/upcoming — топ задач на неделю/месяц
- POST /tasks — создать задачу