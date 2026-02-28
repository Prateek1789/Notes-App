# 📝 NoteWeaver (Or Your App Name)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)

A comprehensive, rich-text note-taking application designed to demonstrate the evolution of modern web architecture. 

This repository is structured as a monorepo, showcasing the progression of the application from a Vanilla JavaScript Single Page Application (SPA) to a fully Server-Side Rendered (SSR) Next.js application.

## 🚀 Project Evolution (Repository Structure)  

### 📂 Folder Structure
```text
Notes-App/
├── .git/                 # Shared Git repository
├── .gitignore            # Global ignore rules (node_modules, .next, .env)
├── index.html            # Portfolio Landing Page (Version Directory)
├── v0-vanilla/           # Version 0: Pure Vanilla JS SPA
├── v1-react/             # Version 1: React, Vite, React Router v7
└── v2-nextjs/            # Version 2: Next.js App Router Monolith

This project was deliberately built in three distinct phases to master different state management and routing paradigms:

* **[v0-vanilla](./v0-vanilla):** The foundational UI and logic built with pure HTML, CSS, and Vanilla JavaScript.
* **[v1-react](./v1-react):** A Client-Side Rendered (CSR) migration using **React**, **Vite**, and **React Router v7 (Data Mode)**. Implements local state management and client-side route protection.
* **[v2-nextjs](./v2-nextjs):** The final production architecture. Rebuilt using **Next.js App Router**, leveraging Server Components, Server Actions for data mutation, and Edge Middleware for zero-layout-shift authentication.

## ✨ Core Features

* **Rich Text Editing:** Integrated with **TipTap** to support varied text nodes, formatting, code blocks, and lists.
* **Notebook Organization:** Categorize notes into dedicated notebooks for structured knowledge management.
* **Authentication Flow:** Secure login and registration with route protection (handled via client-loading in v1 and Server Middleware in v2).
* **Soft Delete (Trash):** A dedicated trash bin interface for recovering or permanently deleting notes.
* **Responsive Design:** Fully fluid UI built with Tailwind CSS, optimized for both desktop and mobile workflows.

## 🛠️ Tech Stack Highlights 

**Version 0 (Vanilla JS):**
* Architecture: Single Page Application (SPA)
* UI/DOM: HTML5, CSS3, Vanilla JavaScript (ES6+) 
* Storage: Browser LocalStorage API 

**Version 1 (React):**
* Routing & Data Fetching: React Router v7 (Loaders & Actions)
* Client State: Zustand
* Editor: TipTap 
* Styling: Tailwind CSS

**Version 2 (Next.js):**
* Framework: Next.js (App Router)
* Server State & Mutations: Server Components & Server Actions
* Auth Protection: Next.js Middleware
* Client State (Editor): Zustand

## 💻 Getting Started (Local Development)

Because this is a monorepo, you can run any version of the application in isolation.

**Prerequisites:**
* Node.js (v18 or higher)
* npm or pnpm   

### Running Version 0 (React/Vite)
No build step or installation is required for this version.
cd v0-Vanilla/
open index.html in your browser or local server extension like Live server

### Running Version 1 (React/Vite)
```bash
cd v1_React_App
npm install
npm run dev     
