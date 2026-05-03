# **MAIA**

<div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin: 16px 0;">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat&logo=nextdotjs" alt="Next.js" height="20" />
  <img src="https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react" alt="React" height="20" />
  <img src="https://img.shields.io/badge/Tailwind-3-38b2ac?style=flat&logo=tailwindcss" alt="Tailwind" height="20" />
  <img src="https://img.shields.io/badge/JS-ES2022-f7df1e?style=flat&logo=javascript" alt="JavaScript" height="20" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" height="20" />
</div>

Фронтенд-часть проекта Maia — веб-интерфейс, построенный на Next.js (React). Репозиторий представляет собой монорепозиторий, содержащий как клиентскую часть (разработанную мной), так и серверные компоненты (разработанные другими участниками команды).

## ✨ Ключевые фичи

| 🛠 Функция | 💻 Технологии |
|---|---|
| 🚀 **SSR/SSG роутинг** | Next.js Pages Router |
| 🎨 **Адаптивный дизайн** | Tailwind CSS + mobile-first |
| 🌓 **Тёмная тема** | CSS-variables + localStorage |
| 🧩 **Переиспользуемые компоненты** | React Components + props |
| 🧪 **Линтинг и форматирование** | ESLint + Prettier |

## 📂 Структура проекта

```text
maia-frontend/
├── 📁 public/                    # Статические ресурсы
│   ├── 📁 images/                # Иконки, плейсхолдеры, иллюстрации
│   └── 📄 favicon.ico
├── 📁 src/
│   ├── 📁 components/            # UI-компоненты
│   │   ├── 📁 ui/                # Базовые элементы (Button, Card, Input)
│   │   ├── 📁 medical/           # Медицинские компоненты
│   │   │   ├── MedicalImageViewer.jsx  # Отображение снимка с зумом
│   │   │   ├── AnnotationOverlay.jsx   # Оверлей для bounding boxes
│   │   │   └── PredictionCard.jsx      # Карточка результата модели
│   │   └── 📁 layout/            # Header, Footer, Sidebar, Container
│   ├── 📁 pages/                 # Страницы (роутинг Next.js)
│   │   ├── 📄 index.js           # Лендинг с описанием платформы
│   │   ├── 📄 upload.js          # Страница загрузки изображений
│   │   ├── 📄 results/[id].js    # Динамическая страница результатов
│   │   └── 📁 api/               # API-роуты (serverless)
│   ├── 📁 styles/                # Стили
│   │   ├── 📄 globals.css        # Tailwind imports + кастомные утилиты
│   │   └── 📄 theme.js           # Конфигурация цветовой палитры
│   ├── 📁 utils/                 # Утилиты
│   │   ├── 📄 api.js             # Функции для запросов к backend
│   │   ├── 📄 image.js           # Обработка изображений на клиенте
│   │   └── 📄 constants.js       # Глобальные константы и конфиги
│   └── 📁 hooks/                 # Кастомные хуки
│       └── 📄 usePrediction.js   # Хук для управления состоянием предсказаний
├── 📄 next.config.js             # Конфигурация Next.js
├── 📄 tailwind.config.js         # Настройка дизайн-системы
├── 📄 package.json               # Зависимости и скрипты
├── 📄 .eslintrc.json             # Правила линтинга
└── 📄 README.md                  # Документация проекта
```

## 🛠️ Стек и инструменты

| 📦 Категория | 💻 Технологии |
|---|---|
| **Фреймворк** | Next.js 14 (Pages Router) |
| **UI-библиотека** | React 18 + Hooks |
| **Стилизация** | Tailwind CSS 3 |
| **Шрифты** | next/font (Inter) |
| **Линтинг** | ESLint + Prettier |
| **Сборка** | Webpack (встроен в Next.js) |
| **Деплой** | Vercel |

## 🚀 Как запустить

### **Требования**

- Node.js ≥ 18.x
- npm / yarn / pnpm

### Установка

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/Nenneke2999/maia.git
cd maia

# 2. Установите зависимости
npm install

# 3. Запустите сервер разработки
npm run dev

# 4. Откройте в браузере
👉 http://localhost:3000
```
