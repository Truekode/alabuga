ТЕСТОВОЕ ЗАДАНИЕ АЛАБУГА 

# Alabuga UI (Vite + React + TS + Router + TanStack Query)

Интерфейс для визуализации космических объектов (Edges) и их характеристик (тегов): текущее состояние (Currents) и
история (Histories).

## Стек

- Vite, React 19, TypeScript (strict)
- React Router
- TanStack Query
- styled-components (тема и CSS‑токены)

## Скрипты

- `npm run dev` — запуск dev‑сервера
- `npm run build` — сборка
- `npm run preview` — предпросмотр сборки
- `npm run lint` — линт
- `npm run test` — юнит‑тесты (Vitest)
- `npm run test:ui` — интерактивный режим тестов

## Переменные окружения

Создайте `.env` (см. `.env.example`):

```
VITE_APP_NAME=Alabuga
VITE_API_URL=https://drill.greact.ru
VITE_PORT=5173
```

В dev среде используются моки; в prod — реальные эндпоинты.

## Архитектура (FSD)

- Слои: `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`
- Публичные API через `index.ts`; импорт только по алиасам слоёв
- styled‑components выносятся в `style.ts` рядом с компонентом

## Запуск

```
npm install
npm run dev
```

Откройте `http://localhost:5173`.

## Страницы

- `/edges` — список объектов
- `/edges/:id/currents` — текущее состояние
- `/edges/:id/histories` — история значений

Query‑параметры:

- `?tags=tag1,tag2` — выбранные теги
- `?color:<tag>=#rrggbb` — цвет серии на графике

## Данные и запросы

- Dev: моки в хуках `useEdges`, `useCurrent`, `useHistory`
- Prod: реальные запросы на `VITE_API_URL`
- Таймауты и отмена: `AbortController` в `useCurrent/useHistory`
- Кеширование: `staleTime`, `retry` настроены для prod

## Компоненты

- Булевые: `BooleanLight`, `BooleanSwitch`, `BooleanIndicator` (цвет: 1=красный, 0=зелёный)
- Числовые: `NumericValueCard`, `NumericProgressBar`, `NumericGauge`, `NumericTrendSparkline`, `NumericIndicator`
- Универсальный `Indicator` по `type`
- Статусы: `ListSkeleton`, `ChartSkeleton`, `ErrorBanner`, `EmptyState`, `ErrorBoundary`

## Тесты

Vitest, примеры:

- `normalizeCurrent/inferType`
- `validateEdges`
- индикаторы (boolean/numeric)
