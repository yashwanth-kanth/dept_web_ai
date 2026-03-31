# Artificial Intelligence & Data Science Department Website

A complete full-stack web application designed for an Indian university providing information on academics, faculty, and events, along with an RSVP system.

## Features
- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Axios, Framer Motion, React Node Form & Zod.
- **Backend**: Django 5, Django REST Framework (DRF), SimpleJWT Authentication.
- **Database**: MySQL 8 (via XAMPP).

## Environment Setup (Local)

### 1. Database (MySQL via XAMPP)
1. Open XAMPP Control Panel.
2. Start the **MySQL** module.
3. Import the `database/init.sql` script via phpMyAdmin or run it in your terminal:
   ```bash
   mysql -u root < database/init.sql
   ```
4. This ensures the `ai_dept_db` database exists.

### 2. Backend (Django)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Activate your virtual environment and install requirements:
   - For Windows: `python -m venv venv` and `.\venv\Scripts\Activate.ps1`
   - Install packages: `pip install -r requirements.txt` (Or manually install: django, djangorestframework, mysqlclient, django-cors-headers, django-environ, djangorestframework-simplejwt, Pillow)
3. Run Migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
4. Create an admin superuser to manage events, faculty, and academics:
   ```bash
   python manage.py createsuperuser
   ```
5. Run the backend development server:
   ```bash
   python manage.py runserver
   ```
   The backend will start at `http://localhost:8000/`. You can access the Admin Panel at `/admin/`.

### 3. Frontend (React + Vite)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The app will typically start at `http://localhost:5173/`.

### Deployment Scripts
- **Backend Options**: Can be deployed to Heroku or Render using gunicorn. Make sure to set environment variables for Database connection and `ALLOWED_HOSTS`.
- **Frontend Options**: The React `dist` buildup from `npm run build` can be deployed easily on Vercel or Netlify via linking the GitHub repository.

## Credentials
- Ensure `root` has no password in XAMPP, or adjust `backend/dept_ai_backend/settings.py` DATABASES section according to your XAMPP credentials.
