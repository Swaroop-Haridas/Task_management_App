# Task Management Application

A full-stack task management application that helps users create, organize, update, and track tasks efficiently. The application provides a modern user interface, secure backend services, and persistent data storage for managing daily tasks and productivity workflows.

## Features

- User authentication and authorization
- Create, update, and delete tasks
- Task status management
- Responsive user interface
- RESTful API architecture
- Secure backend validation
- MongoDB database integration

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- NestJS
- Node.js
- TypeScript
- MongoDB
- Mongoose

### Tools
- Docker
- Git
- Postman

## Project Structure

```text
Task_management_App/
│
├── frontend/          # Next.js frontend
├── task-backend/      # NestJS backend
├── docker-compose.yml
├── package.json
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/Swaroop-Haridas/Task_management_App.git
cd Task_management_App
```

## Backend Setup

```bash
cd task-backend

npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run the backend:

```bash
npm run start:dev
```

Backend runs on:

```text
http://localhost:5000
```

## Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

## Running with Docker

```bash
docker-compose up --build
```

## API Endpoints

### Authentication

```http
POST /auth/register
POST /auth/login
```

### Tasks

```http
GET    /tasks
POST   /tasks
PUT    /tasks/:id
DELETE /tasks/:id
```

## Architecture

```text
┌───────────────┐
│   Frontend    │
│   Next.js     │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│  NestJS API   │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│   MongoDB     │
└───────────────┘
```
