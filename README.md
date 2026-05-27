# 📚 BookShelf — Modern Book Management System

BookShelf is a premium, high-performance React application designed to help users catalog, search, filter, and organize their personal libraries. Built with React 19, Vite, and custom CSS styling, it features a glassmorphic user interface, micro-animations, and dynamic visual badges. 

The application integrates with a local mock database API via `json-server` to perform persistent, real-time CRUD operations.

---

## 🌍 Live Demo
**[Live Application URL](https://book-management-system-eight-dusky.vercel.app/)**

---

## ✨ Features

- **Full CRUD Support**: Create new books, read your library collection, update existing entries, and delete books.
- **Interactive Forms**: A modern popup form with keyboard shortcuts (`Escape` key support) and click-outside dismissal.
- **Integer Verification**: Publication years are automatically sanitized and parsed to proper integer types before saving.
- **Instant Real-Time Search**: Instantly look up any book by its **Title** or **Author**.
- **Dynamic Genre Badges**: Custom color-coded tag matching for genres (*Fiction, Classic, Dystopian, Romance, Sci-Fi, Non-Fiction*).
- **Modern Toasts**: Clean, high-fidelity floating notifications for all success, warning, or error actions.
- **Fully Responsive**: Specially optimized layout states for mobile, tablet, and touch screens.
- **Accessibility (a11y)**: Built with native semantic HTML5, connected standard input label attributes (`htmlFor`), and descriptive unique testing IDs.

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: Vanilla CSS (Fluid Glassmorphic Theme using Outfit typeface)
- **Database Backend**: Mock REST API using [JSON Server](https://github.com/typicode/json-server)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting**: [ESLint](https://eslint.org/)

---

## 🚀 Getting Started

### 📋 Prerequisites

To run this application locally, you will need **Node.js** (v18.0.0 or higher recommended) and **npm** installed on your system.

### 📥 1. Clone & Install Dependencies

Open a terminal, navigate to the project directory, and install all required modules:

```bash
# Install dependencies
npm install
```

### ⚡ 2. Start the Backend API Server

The application uses `json-server` to serve mock database records from the `db.json` file. Start the database service by running:

```bash
npm run server
```
- **Port**: Runs on port `3001`
- **Mock Endpoint**: [http://localhost:3001/books](http://localhost:3001/books)

### 💻 3. Start the Frontend Client

In a separate terminal workspace, launch the Vite React developer server:

```bash
npm run dev
```
- **Local Address**: [http://localhost:5173/](http://localhost:5173/)

You are ready! Open your browser and navigate to the local address to catalog your library.

---

## 📦 Production Builds & Quality Checks

### 🏗️ Build for Production
To bundle the frontend components into optimized static assets (`dist` folder), execute:
```bash
npm run build
```

### 🔍 Run Style and Linter Audit
To verify linting standards and check for code styling syntax errors, run:
```bash
npm run lint
```

---

## 📂 Project Structure

```text
├── db.json                # JSON mock database records
├── eslint.config.js       # ESLint configurations
├── index.html             # Document entrypoint with SEO metadata
├── package.json           # Scripts and module definitions
├── src/
│   ├── main.jsx           # App entrypoint
│   ├── App.jsx            # Parent container, search filters, and toasts logic
│   ├── index.css          # Visual tokens, glassmorphism rules, and custom scrollbars
│   ├── components/
│   │   ├── BookCard.jsx   # Individual cards with dynamic genre classes & icons
│   │   ├── BookForm.jsx   # Input fields, overlay clicks, and Esc triggers
│   │   └── Loader.jsx     # Shimmer skeleton loader templates
│   └── services/
│       └── api.js         # Fetch client configurations (GET, POST, PUT, DELETE)
```
