# React + Node + Firebase CRUD

A high-performance, polished CRUD application featuring a Glassmorphism UI, real-time-capable architecture, and dual-mode data persistence (Firebase Firestore ).

## Features
**Premium UI**: Custom-built Glassmorphism design with CSS variables, gradients, and micro-interactions.
**Dual-Mode Backend**:
**Production**: Connects to Firebase Firestore for real-time cloud data.
**Tech Stack**:
    **Frontend**: React (Vite), Axios, Lucide React (Icons), Vanilla CSS (Premium).
    **Backend**: Node.js, Express, Firebase Admin SDK.

## Setup Instructions

### Prerequisites
Node.js (v14+)
npm

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```
The server will start on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
The client will start on `http://localhost:5173`.

## Design Choices

**Vanilla CSS**: Chosen over libraries like Tailwind to demonstrate core CSS mastery and create a unique, non-generic aesthetic.
**Glassmorphism**: Uses `backdrop-filter`, semi-transparent backgrounds, and borders to create depth and hierarchy.
**Fallback Architecture**: The controller checks for `db` connection. If unavailable, it seamlessly switches to a local array, ensuring the app is always testable.

## Usage

1.  **Dashboard**: View all items. (Read)
2.  **Add Item**: Click the "+" button to open the modal. (Create)
3.  **Edit/Delete**: Use the icon buttons on each card. (Update and Delete)
# Inventory-Management-CRUD
