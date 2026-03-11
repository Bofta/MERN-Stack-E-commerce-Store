# 🛒 MERN Stack E-Commerce Store

A full-featured e-commerce web application built with MongoDB, Express, React, and Node.js. Browse products, manage a cart, place orders, and handle payments — all in one place.

---

## ✨ Features

- 🔐 User authentication (register, login, JWT-based sessions)
- 🛍️ Product listing with search, filtering & pagination
- ⭐ Product reviews and ratings
- 🛒 Shopping cart with quantity management
- 💳 Checkout with PayPal integration
- 📦 Order history and tracking
- 🔧 Admin dashboard — manage products, users & orders
- 📷 Image uploads for products

---

## 🧰 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React, Redux Toolkit, React Router |
| Backend   | Node.js, Express                  |
| Database  | MongoDB + Mongoose                |
| Auth      | JSON Web Tokens (JWT)             |
| Payments  | PayPal SDK                        |
| Dev Tools | Vite, Nodemon, Concurrently       |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally **or** a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

### 1. Clone the repo

```bash
git clone https://github.com/Bofta/MERN-Stack-E-commerce-Store.git
cd MERN-Stack-E-commerce-Store
```

### 2. Set up environment variables

The `.env` file is already in the root. Open it and fill in your values:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

> 💡 Using MongoDB Atlas? Your URI will look like:
> `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/your-db-name`

### 3. Install dependencies

```bash
# Install root + backend dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### 4. Seed the database (optional)

Populate the database with sample products and users:

```bash
npm run data:import
```

To wipe it clean:

```bash
npm run data:destroy
```

### 5. Run the app

```bash
npm run dev
```

This starts both the backend (port `5000`) and the frontend (port `3000`) concurrently.

---

## 🗂️ Project Structure

```
├── backend/
│   ├── config/        # Database connection
│   ├── controllers/   # Route logic
│   ├── middleware/     # Auth, error handling
│   ├── models/        # Mongoose schemas
│   └── routes/        # API endpoints
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── slices/    # Redux state
│   │   └── utils/
├── uploads/           # Product images
└── .env
```

---

---
