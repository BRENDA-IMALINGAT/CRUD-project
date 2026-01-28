## CRUD

**CRUD** is a full‑stack Create, Read, Update and Delete application built with a React (Vite) frontend and a Node.js/Express backend, with optional Firebase Firestore persistence and an in‑memory fallback for easy local testing.

### How the project works

- **Frontend (client)**:  
  - Built with React and Vite in `client`.  
  - Calls the backend through Axios using the base path `/api/items`.  
  - Renders a glassmorphism‑style dashboard where each item is displayed as a card with title and description.  
  - Provides a modal form to create and edit items, and icon buttons to delete items.

- **Backend (server)**:  
  - Implemented with Node.js and Express in `server`.  
  - Exposes REST endpoints under `/api/items` implemented in `routes/items.js` and `controllers/itemsController.js`.  
  - Tries to use Firebase Firestore via `server/config/firebase.js`.  
  - If a valid Firebase service account is not configured, it falls back to an in‑memory array so you can still test the full CRUD flow without any external services.

- **Data flow**:  
  - The React client sends HTTP requests (GET, POST, PUT, DELETE) to the Node/Express API.  
  - The controller either persists data to Firestore (`db` is available) or stores it in the local in‑memory list (`localItems`).  
  - Responses are sent back as JSON and rendered immediately in the UI.

### Prerequisites

- **Node.js**: version 18 or later recommended (minimum 14).  
- **npm**: comes with Node.js.  
- Optional, for production‑style persistence: a Firebase project and service account credentials.

### Backend setup and run

1. Open a terminal in the project root and go to the server:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional but recommended) Configure Firebase service account for Firestore:
   - Create a service account key JSON in your Firebase project.  
   - Copy its full JSON contents into an environment variable in `server/.env`:
     ```env
     FIREBASE_SERVICE_ACCOUNT_KEY=YOUR_JSON_CONTENT_HERE
     ```
   - When this variable is present and valid, the backend uses Firestore; otherwise, it uses the in‑memory fallback.
4. Start the backend in development mode:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`.

### Frontend setup and run

1. In a second terminal, from the project root go to the client:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Open the URL that Vite prints in the terminal (by default `http://localhost:5173`).  
   The client is configured to call the backend via the relative path `/api/items`, so when both are running locally you can use the app without any extra configuration.

### Using the CRUD application

- **View items (Read)**: When the app loads, it requests `GET /api/items` and displays each item in a card grid.  
- **Create items (Create)**: Click the **Add Item** button in the header to open the modal form. Enter a title and optional description, then submit to create a new item.  
- **Update items (Update)**: On any item card, click the edit icon to open the modal pre‑filled with that item’s details, then change the fields and save.  
- **Delete items (Delete)**: On any item card, click the delete icon and confirm; the item is removed from Firestore or the in‑memory store, depending on configuration.

### Tech stack and design

- **Frontend**: React (with Vite), Axios for HTTP calls, Lucide React for icons, and custom CSS (`index.css`, `App.css`) implementing a glassmorphism‑style interface.  
- **Backend**: Node.js, Express, CORS, dotenv, and Firebase Admin SDK for Firestore access.  
- **Design**:  
  - Uses gradients, blur, and subtle animations for a modern dashboard feel.  
  - Cards and modals are styled as glass panels with clean typography.  
  - Layout is responsive and focuses on clarity for the core CRUD operations.
