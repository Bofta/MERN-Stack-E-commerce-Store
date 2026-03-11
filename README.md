# MERN-Stack-E-commerce-Store
A full-featured e-commerce web application built with MongoDB, Express, React, and Node.js. Browse products, manage a cart, place orders, and handle payments — all in one place.

✨ Features

🔐 User authentication (register, login, JWT-based sessions)
🛍️ Product listing with search, filtering & pagination
⭐ Product reviews and ratings
🛒 Shopping cart with quantity management
💳 Checkout with PayPal integration
📦 Order history and tracking
🔧 Admin dashboard — manage products, users & orders
📷 Image uploads for products


🧰 Tech Stack
LayerTechnologyFrontendReact, Redux Toolkit, React RouterBackendNode.js, ExpressDatabaseMongoDB + MongooseAuthJSON Web Tokens (JWT)PaymentsPayPal SDKDev ToolsVite, Nodemon, Concurrently


🚀 Getting Started
Prerequisites

Node.js v18+
MongoDB running locally or a free MongoDB Atlas cluster

Project Structure
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

