# 🚀 NoteFlow v2 (Production Full-Stack)

[![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

## 🌍 Live Deployment
[Launch NoteFlow v2](https://v2-noteflow.vercel.app/) *(Hosted on Vercel Edge Network)*

## 📖 About This Version

NoteFlow v2 represents the final, production-ready iteration of the NoteFlow monorepo. It transitions the application from a purely client-side architecture into a **full-stack, heavily optimized web application**. 

This build leverages the Next.js App Router for server-rendered shells, while offloading complex layout orchestration to the client. It features a completely custom, rich-text editing experience backed by a secure PostgreSQL database.

## 🏗️ Architectural Highlights

### 1. Hybrid Rendering & Layout Orchestration
To achieve a native experience without sacrificing the initial load performance of Next.js, the application utilizes a strict boundary between Server and Client Components. 
* **Dynamic Wrapper Pattern:** The complex 3-pane dashboard is dynamically imported (`ssr: false`) into a server-rendered layout shell. This completely eliminates Next.js hydration flashes when evaluating `window` object breakpoints for the responsive sidebar.
* **Framer Motion Integration:** Smooth, physics-based transitions manage the layout shift between the mobile stack-navigator and the desktop multi-pane view.

### 2. State Management (The Slice Pattern)
After experimenting with heavier flux architectures like Redux, client state was ultimately created in **Zustand** using a modular slice pattern. This provides a single global store while keeping domain logic perfectly isolated:
* `createUserSlice`: Manages required user data.
* `createNotebookSlice`: Manages notebook data and state.
* `createAppStore`: Binds all the slices into a single store.

### 3. Full-Stack Security & Proxy Routing
Moving beyond local storage, v2 integrates a complete Backend-as-a-Service (BaaS) via **Supabase**.
* **PostgreSQL Schema:** A fully normalized relational database managing `Users` → `Notebooks` → `Notes`.
* **Row Level Security (RLS):** Database-level policies ensure that authenticated users can only query, update, or delete their own specific note rows.
* **Next.js 16 Proxy Routing:** Secure route protection and authentication interception handled via the modern Next.js proxy logic, ensuring instant redirects for unauthenticated users before a page even renders.

### 4. The Canvas (Rich Text Editing)
The core editing experience is powered by a heavily customized **TipTap** implementation. It strips away standard WYSIWYG toolbars in favor of a modern, block-based Notion-style interface, engineered specifically to prevent unnecessary DOM re-renders during high-speed typing.

## 🧰 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Database & Auth:** Supabase (PostgreSQL)
* **Styling:** Tailwind CSS v4 (Zero-config setup)  
* **Animations:** Motion (Previously Framer Motion)
* **UI Components:** Shadcn UI (Accessible primitives)
* **Forms & Validation:** React Hook Form + Zod
* **Editor:** TipTap headless rich-text framework   

## 📁 Project Structure 
```text
v2-nextjs/  
├── src/  
│   ├── app/
│   │   ├── (private)/
│   │   │   ├── dashboard/
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (public)/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   ├── signup/
│   │   │   │   └── signup-success/
│   │   │   │
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── globals.css
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   ├── icons/
│   │   ├── layout/
│   │   └── ui/
│   │ 
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   └── auth.schema.ts
│   │   │
│   │   ├── dashboard/
│   │   │   └── components/
│   │   │       ├── layout/
│   │   │       └── ui/
│   │   │
│   │   └── landing/
│   │       └── components/
│   │           ├── layout/
│   │           └── views/
│   │
│   ├── hooks/
│   ├── lib/
│   │   ├── supabase/
│   │   └── utils.ts
│   │
│   ├── store/
│   └── types/ 
│
└── README.md   
```

<!-- ## 💻 Local Development Setup

To run this application locally, you will need to connect it to your own Supabase instance.

**1. Install Dependencies**
```bash
npm install
# Create a .env.local file and add your Supabase keys
npm run dev
```   -->