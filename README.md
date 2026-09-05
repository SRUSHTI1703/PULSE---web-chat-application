# PULSE — Web Chat Application

> A modern real-time web chat application built with the MERN stack, featuring secure authentication, global messaging, private conversations, and real-time communication.

---

## 🚀 Overview

**PULSE** is a full-stack real-time chat application designed to provide a smooth and modern messaging experience.

The application allows users to register and securely log in, communicate through a global chat, start private conversations, and receive real-time message updates.

The project combines a **React frontend**, **Node.js/Express backend**, **MongoDB database**, and **Socket.IO** for real-time communication.

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected chat routes
- Secure password handling
- Persistent authentication state

### 💬 Real-Time Messaging
- Global chat
- Private one-to-one conversations
- Real-time message delivery using Socket.IO
- Conversation-based messaging
- Automatic message updates

### 👥 User & Conversation Management
- View available users
- Start private conversations
- View existing conversations
- Switch between global and private chats

### 🎨 Modern UI
- Responsive React interface
- Modern dark-themed design
- Clean chat layout
- Sidebar navigation
- Mobile-friendly interface
- Interactive authentication screens

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Material UI
- Formik
- Yup
- Socket.IO Client
- CSS

### Backend
- Node.js
- Express.js
- REST APIs
- Socket.IO
- JWT Authentication
- bcrypt

### Database
- MongoDB
- Mongoose

### Development Tools
- Git
- GitHub
- Postman
- VS Code
- npm

---

## 🏗️ Project Architecture

```text
PULSE
│
├── client/
│   ├── public/
│   └── src/
│       ├── Chat/
│       ├── Home/
│       ├── Layout/
│       ├── Services/
│       ├── Utilities/
│       ├── App.js
│       ├── index.js
│       └── index.css
│
├── config/
│   └── keys.js
│
├── models/
│
├── routes/
│   └── api/
│
├── utilities/
│
├── validation/
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
