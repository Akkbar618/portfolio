# Master TODO (Portfolio Website)

> Важно: в текущем репозитории нет backend/API/БД. Ниже список задач для frontend, архитектуры, безопасности, производительности и качества.

## P0 — Критично (сделать в первую очередь)

- [ ] Добавить security headers в `vercel.json`:
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy`
  - `Permissions-Policy`
- [ ] Убрать inline-скрипт темы из `index.html` в отдельный файл и подогнать CSP под него.
- [ ] Вынести прод-логирование ошибок из `ErrorBoundary` в мониторинг (Sentry/LogRocket/другое), а не только `console.error` в dev.
- [ ] Закрыть дыры тестирования критических пользовательских флоу:
  - [ ] навигация `/projects/:slug`
  - [ ] поведение при невалидном `slug`
  - [ ] восстановление scroll после reload
  - [ ] сохранение/восстановление темы

## P1 — Высокий приоритет (архитектурный долг)

- [ ] Убрать дублирование логики карусели:
  - [ ] создать общий хук `useCarouselController`
  - [ ] перевести на него `src/components/sections/Projects.tsx`
  - [ ] перевести на него `src/pages/ProjectDetail.tsx`
- [ ] Разбить `src/pages/ProjectDetail.tsx` на несколько файлов:
  - [ ] `ProjectHeader`
  - [ ] `ProjectCarouselSection`
  - [ ] `ProjectDetailsSection`
  - [ ] page-container с оркестрацией состояния
- [ ] Вынести работу с клиентским storage в единый слой (`theme`, `scrollY`) с безопасными хелперами и фолбэками.
- [ ] Свести все route/path-константы в единый файл (избавиться от строковых литералов `"/"`, `"/projects/:slug"`, `"/easter"` по коду).

## P1 — Производительность

- [ ] Убрать частые синхронные записи `sessionStorage` в scroll-хендлере:
  - [ ] перейти на debounce/throttle + `requestIdleCallback` (с fallback)
  - [ ] оставить `pagehide` как гарантированный flush
- [ ] Снизить стоимость анимаций на `/easter`:
  - [ ] уменьшить `CONFETTI_COUNT`
  - [ ] добавить адаптивное количество по device class / reduced-motion
- [ ] Проверить целесообразность `styled-components` ради одного `ServerLoader`:
  - [ ] оставить только если реально нужно
  - [ ] иначе заменить на CSS/Tailwind и убрать лишний runtime-вес
- [ ] Ввести performance budget на bundle size и падение CI при нарушении.

## P1 — Безопасность данных/контента

- [ ] Ввести allowlist для внешних ссылок (GitHub/LinkedIn/Telegram и т.д.) через общий helper.
- [ ] Добавить централизованный sanitizer/validator для URL перед рендером в `href/src` (где применимо).
- [ ] Добавить базовый security checklist в PR template (CSP, ссылки, user-input, storage).

## P2 — Тесты и надежность

- [ ] Расширить unit/integration тесты:
  - [ ] `useTheme`
  - [ ] `useSwipe`
  - [ ] `useScrollAnimation`
  - [ ] логика scroll restoration на `Index`
  - [ ] логика таймеров карусели
- [ ] Расширить e2e покрытие:
  - [ ] переходы между страницами и back navigation
  - [ ] поведение mobile menu
  - [ ] dark/light/system режимы
  - [ ] accessibility smoke (`aria`, keyboard navigation)
- [ ] Добавить тест-кейс для `/easter` (рендер changelog и fallback версии).

## P2 — DX / процессы

- [ ] Добавить `npm run ci:full` (lint + unit + e2e + build + bundle checks).
- [ ] Настроить Dependabot/Renovate для зависимостей.
- [ ] Добавить PR template с обязательными пунктами проверки (security/perf/tests).
- [ ] Добавить CONTRIBUTING.md с правилами архитектуры и тестирования.

## P2 — Контент и продуктовые долги

- [ ] Заменить все `Coming Soon...` в `src/data/projectsSummary.ts` и `src/data/projects.ts` на реальные данные.
- [ ] Добавить реальные экраны проектов вместо placeholder изображений.
- [ ] Уточнить `README.md`:
  - [ ] явно отметить, что это SPA без backend
  - [ ] описать структуру модулей и правила добавления новых страниц/секций

## P3 — Полировка

- [ ] Пройтись по а11y:
  - [ ] контрастность
  - [ ] фокус-стили
  - [ ] screen-reader подписи
- [ ] Добавить ручной performance regression checklist перед релизом.
- [ ] Добавить changelog-процесс для технических изменений (не только продуктовых).

## Предлагаемый порядок выполнения (коротко)

1. P0 security headers + CSP + inline script refactor  
2. P0/P1 тесты критических сценариев  
3. P1 рефактор карусели + декомпозиция `ProjectDetail`  
4. P1 performance (scroll storage + easter confetti + bundle budget)  
5. P2 процессы и контентные долги

