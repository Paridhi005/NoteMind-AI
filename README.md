# 📚 NoteMind AI

![Banner](https://raw.githubusercontent.com/Paridhi005/NoteMind-AI/main/screenshots/banner.png)

An AI-powered study assistant that helps students learn faster by generating summaries, quizzes, flashcards, and document-based Q&A from uploaded PDF notes.

## 🚀 Live Demo

👉 https://your-vercel-url.vercel.app

---

# Features

- 📄 Upload PDF Notes
- 📒 Create Multiple Notebooks
- 🗑 Delete Notebooks & PDFs
- 🤖 AI Summary Generator
- 📝 AI Quiz Generator
- 🎴 AI Flashcards
- 💬 AI Chat (Ask Questions from PDF)
- 📊 Dashboard with Statistics
- Modern Responsive UI

---

## 📸 Screenshots

### Dashboard

![Dashboard](https://raw.githubusercontent.com/Paridhi005/NoteMind-AI/main/screenshots/dashboard.png)

---

### Workspace

![Workspace](https://raw.githubusercontent.com/Paridhi005/NoteMind-AI/main/screenshots/workspace.png)

---

### AI Summary

![Summary](https://raw.githubusercontent.com/Paridhi005/NoteMind-AI/main/screenshots//summary.png)

---

### AI Quiz

![Quiz](https://raw.githubusercontent.com/Paridhi005/NoteMind-AI/main/screenshots/quiz.png)

---

### AI Flashcards

![Flashcards](https://raw.githubusercontent.com/Paridhi005/NoteMind-AI/main/screenshots/flashcards.png)

---

### AI Chat

![Chat](https://raw.githubusercontent.com/Paridhi005/NoteMind-AI/main/screenshots/chat.png)

---

# Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## AI
- Google Gemini API

---

# Folder Structure

```
NoteMind AI
│
├── frontend
│
├── backend
│
└── README.md
```

---

# Installation

## 1. Clone Repository

```bash
git clone <your-repository-url>
```

---

## 2. Install Backend

```bash
cd backend
npm install
```

---

## 3. Install Frontend

```bash
cd frontend
npm install
```

---

# Environment Variables

Inside the **backend** folder create a file named

```
.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

---

# Gemini API Setup (IMPORTANT)

This project uses the Google Gemini API.

## Step 1

Go to

https://aistudio.google.com/app/apikey

---

## Step 2

Sign in using your Google account.

---

## Step 3

Click

```
Create API Key
```

---

## Step 4

Copy the generated key.

Example:

```
AQ.AbXXXXXXXXXXXXXXX
```

---

## Step 5

Paste it inside

```
backend/.env
```

Example

```env
GEMINI_API_KEY=AQ.AbXXXXXXXXXXXXXXX
```

---

## Step 6

Restart the backend every time you change the API key.

```bash
npm start
```

or

```bash
node server.js
```

---

# If Gemini Stops Working

If Summary, Quiz, Flashcards or Chat suddenly return **500 Internal Server Error**, check these:

### 1. API Key

Verify the key inside

```
backend/.env
```

---

### 2. Restart Backend

Changing the key **does NOT update automatically.**

Restart using

```bash
npm start
```

---

### 3. Test Gemini

Run

```bash
node test-gemini.js
```

If it prints

```
Hello!
```

Gemini is working correctly.

---

### 4. Quota Exceeded (429)

If you receive

```
429 Too Many Requests
```

You have reached the Gemini free-tier limit.

Options:

- Wait for quota reset
- Create a new API key
- Use another Google account
- Upgrade billing

---

### 5. Service Unavailable (503)

Google servers are temporarily busy.

Simply retry after a few seconds.

---

# Start Backend

```bash
cd backend
npm start
```

Backend runs at

```
http://localhost:5000
```

---

# Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# Author

**PS**

MCA Mini Project

2026