# 📝 ToDo App

A simple **React + TypeScript + Vite** ToDo application with Context API for state management.  
This project is meant to demonstrate clean project setup, modular code, and modern tooling.

---

## 🚀 Tech Stack

- ⚛️ [React 18](https://react.dev/) with TypeScript
- ⚡ [Vite](https://vitejs.dev/) for fast builds and dev server
- 🎨 CSS for styling
- 🧪 [Jest](https://jestjs.io/) for testing
- 📦 Context API for state management

---

## 📂 Project Structure

```
todo/
├── public/                 # Static assets
├── src/                    # Application source code
│   ├── components/         # Reusable UI components
│   ├── context/            # React Context (ToDoProvider)
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # Base TypeScript config
├── tsconfig.app.json       # TS config for app
├── tsconfig.node.json      # TS config for tooling (vite, jest, etc.)
└── package.json
```

---

## 🔧 Setup & Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/maxkurylenko1/todo.git
cd todo
npm install
```

---

## 🛠️ Available Scripts

Run the app in development mode:

```bash
npm run dev
```

Build the app for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run type-checking:

```bash
npm run typecheck
```

Run tests with Jest:

```bash
npm test
```

---

## 🌍 Deployment

- For **GitHub Pages**: set `base: "/repo-name/"` in `vite.config.ts`.
- For **Netlify/Vercel**: just deploy `dist/`, SPA routing is supported.
- For **custom hosting**: serve the `dist/` folder with a static server.

---

## 📌 Features

- Add new tasks ✨
- Mark tasks as complete ✅
- Delete tasks 🗑️
- Persist state during session ♻️

---

## 👨‍💻 Author

Developed by **Maksym Kurylenko**  
🔗 [GitHub](https://github.com/maxkurylenko1)

---

## 📜 License

This project is licensed under the MIT License.
