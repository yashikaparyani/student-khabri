# Student Khabri Assignment

Designed & Developed by **Yashika Paryani**.

This repository contains the assignment for Student Khabri, featuring a Laravel backend and a highly interactive, futuristic React frontend.

## 🚀 Features

-   **Cyberpunk/Glassmorphism UI**: A visually stunning interface with neon accents, dark mode, and frosted glass effects.
-   **Smooth Animations**: Powered by `framer-motion` for fluid page transitions and interactions.
-   **Modern Icons**: Using `lucide-react` for a clean and professional look.
-   **Responsive Design**: Fully responsive grid layout that works on all devices.
-   **Robust Backend**: Laravel API with SQLite database.
-   **Error Handling**: Comprehensive error messages and loading states.

## 🛠️ Tech Stack

-   **Frontend**: React, Framer Motion, Lucide React, CSS Variables.
-   **Backend**: Laravel 12, SQLite.

## 📦 Setup Instructions

### Prerequisites
- Node.js & npm installed
- PHP & Composer installed (or XAMPP)
- Git installed

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "student khabri"
```

### 2. Backend Setup (Laravel)
Navigate to the backend directory:
```bash
cd backend
```

**Step A: Install Dependencies**
```bash
composer install
```

**Step B: Environment Setup**
Duplicate the example environment file:
```bash
cp .env.example .env
# Windows (Command Prompt/PowerShell):
copy .env.example .env
```

**Step C: Generate App Key**
```bash
php artisan key:generate
# If using XAMPP:
C:\xampp\php\php.exe artisan key:generate
```

**Step D: Database Setup**
1. Create an empty file named `database.sqlite` inside the `backend/database` folder.
2. Run migrations:
```bash
php artisan migrate
# If using XAMPP:
C:\xampp\php\php.exe artisan migrate
```

**Step E: Start Server**
```bash
php artisan serve
# If using XAMPP:
C:\xampp\php\php.exe artisan serve
```
The backend will run at `http://127.0.0.1:8000`.

### 3. Frontend Setup (React)
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

**Step A: Install Dependencies**
```bash
npm install
```

**Step B: Start Application**
```bash
npm start
```
The frontend will run at `http://localhost:3000`.

## 📝 Assignment Note

Thank you to the **Student Khabri** team for this opportunity. I have thoroughly enjoyed building this project and adding my professional touch to it.

---
*Assignment Submission 2026*
