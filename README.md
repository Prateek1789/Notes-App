# 📝 NoteFlow (Monorepo)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)

A comprehensive, rich-text note-taking application designed to demonstrate the evolution of modern web architecture. 

This repository is structured as a monorepo, showcasing the progression of the application from a Vanilla JavaScript Single Page Application (SPA) to a fully Server-Side Rendered (SSR) Next.js application.

## 📂 Repository Structure

```text
Notes-App/
├── assets/              # Icons and assets for the monorepo landing page
├── .gitignore           # Global ignore rules (node_modules, .next, .env)
├── index.html           # Monorepo landing page (Vanilla HTML)
├── styles.css           # Stylesheet for the landing page
├── README.md            # Monorepo documentation
├── v0-vanilla/          # Version 0: Pure Vanilla JS SPA
├── v1_React_App/        # Version 1: React SPA
└── v2-nextjs/           # Version 2: Next.js Fullstack App
```

## 🚀 The Architectural Journey

This project was deliberately engineered in three distinct phases. Rather than just building a final product, this monorepo serves as a masterclass in understanding *why* modern frameworks and state management tools exist by solving the same problems at increasing levels of complexity.

### 📂 [v0: The Fundamentals (Vanilla JS)](./v0-vanilla)
* **Focus:** DOM manipulation, event delegation, and browser APIs.
* **Architecture:** Pure Single Page Application (SPA).
* **Tech:** HTML5, CSS3, Vanilla JavaScript (ES6+), LocalStorage API.

### 📂 [v1: Component Driven (React SPA)](./v1_React_App)
* **Focus:** Declarative UI, client-side routing, and local state management.
* **Architecture:** Client-Side Rendered (CSR) Application.
* **Tech:** React, Vite, React Router, React Context API, TipTap Editor, Tailwind CSS.

### 📂 [v2: Production Full-Stack (Next.js)](./v2-nextjs)
* **Focus:** Full-stack architecture, secure authentication, data persistence, and native-feeling UI/UX.
* **Architecture:** App Router Monolith (SSR/CSR Hybrid) with Backend-as-a-Service (BaaS).
* **Tech (Frontend):** Next.js 16+, Zustand (Global State), Tailwind CSS, Framer Motion (Complex layout animations), Shadcn UI, React Hook Form + Zod (Validation).
* **Tech (Editor):** TipTap (Custom engineered Notion-style rich-text canvas).
* **Tech (Backend):** Supabase (PostgreSQL Database, Row Level Security, and User Authentication).

## ✨ Core Features (v2 Highlights)

* **Notion-Style Rich Text:** A deeply customized TipTap editor supporting advanced text nodes, formatting, and slash-commands.
* **Full-Stack Authentication:** Secure user sessions and protected routes handled via Supabase and Next.js.
* **Native-Feel Responsive Layout:** Highly engineered conditional layouts utilizing Framer Motion for stack-navigation on mobile and multi-pane views on desktop.
* **Data Persistence:** Relational database architecture (Users → Notebooks → Notes) securely stored in PostgreSQL.

## 💻 Getting Started (Local Development)

Because this is a monorepo, you can run any version of the application in isolation.

**Prerequisites:**
* Node.js (v18 or higher)
* npm or pnpm   

### Running Version 0 (HTML, CSS, JS)
No build step or installation is required for this version.
cd v0-Vanilla/
open index.html in your browser or local server extension like Live server

### Running Version 1 (React/Vite)
```bash
cd v1_React_App
npm install
npm run dev
```

### Running Version 2 (NextJS/Vite)
```bash
cd v2_nextjs
npm install
# Create a .env.local file and add your Supabase keys
npm run dev  