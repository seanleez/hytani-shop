# Hytani Shop - E-commerce Store API

A RESTful API for an e-commerce store built with Node.js, Express.js, TypeScript, and MongoDB. This application provides complete functionality for user authentication, product management, shopping cart operations, and balance management.

## Features

### 🔐 Authentication & Authorization

- **User Registration**: Create a new user account with username, email, and password
  - Password validation (6-12 characters)
  - Email validation
  - Unique username and email constraints
  - Automatic password hashing with bcrypt
- **User Login**: Authenticate users and receive JWT tokens
  - Secure password comparison
  - JWT token generation with configurable expiration

- **Protected Routes**: Most endpoints require JWT authentication via Bearer token

### 👤 User Profile

- **Get Profile**: Retrieve authenticated user's profile information
  - User type support (ADMIN, SELLER, BUYER)
  - Extended profile fields (avatar, firstName, lastName, phoneNumber)

### 🛍️ Product Management

Complete CRUD operations for products:

- **GET /api/v1/products**: Retrieve all products (with pagination support)
- **GET /api/v1/products/:id**: Get a specific product by ID
- **POST /api/v1/products**: Create a new product
  - Product categories: ACCESSORY, CLOTHING, ELECTRONICS, FURNITURE, TOOLS, OTHER
  - Product details: name, description, category, thumbnail, price, tags
  - Track sold items and ratings
  - Associate products with seller (listedBy)
- **PATCH /api/v1/products/:id**: Update an existing product
- **DELETE /api/v1/products/:id**: Delete a product

### 💰 Balance Management

- **GET /api/v1/balance/me**: Check your current available balance
- **POST /api/v1/balance**: Update/add balance to your account

### 🛒 Shopping Cart

Full shopping cart functionality:

- **POST /api/v1/cart/products**: Add products to cart
  - Supports multiple products with quantities
- **GET /api/v1/cart**: View all items in your cart
- **PATCH /api/v1/cart/products**: Update product quantities in cart
- **DELETE /api/v1/cart/products**: Remove products from cart
- **POST /api/v1/cart/checkout**: Complete purchase
  - Validates sufficient balance
  - Deducts total amount from user balance
  - Clears cart after successful checkout
  - Prevents checkout on empty cart

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**:
  - Helmet.js for HTTP header security
  - CORS for cross-origin resource sharing
  - Express Rate Limiting (100 requests per 15 minutes)
  - XSS Sanitization
  - Password hashing with bcryptjs

## Project Structure

```
├── app.ts                 # Main application entry point
├── controllers/           # Request handlers organized by feature
│   ├── auth/             # Authentication controllers
│   ├── balance/          # Balance management controllers
│   ├── cart/             # Shopping cart controllers
│   ├── product/          # Product management controllers
│   └── profile/          # User profile controllers
├── db/                   # Database connection configuration
├── middlewares/          # Express middleware functions
│   ├── auth.middleware.ts        # JWT authentication middleware
│   ├── error-handler.middleware.ts
│   ├── not-found.middleware.ts
│   └── async-wrapper.middleware.ts
├── models/               # MongoDB schemas and models
│   ├── user.model.ts
│   ├── user.profile.model.ts
│   ├── product.model.ts
│   ├── cart.model.ts
│   └── user-balance.model.ts
├── routes/               # API route definitions
├── classes/              # Custom error classes
├── constants/            # Application constants
└── types/                # TypeScript type definitions
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

### Profile (Protected)

- `GET /api/v1/profile` - Get user profile

### Products (Protected)

- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get product by ID
- `POST /api/v1/products` - Create product
- `PATCH /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

### Balance (Protected)

- `GET /api/v1/balance/me` - Get my balance
- `POST /api/v1/balance` - Update balance

### Cart (Protected)

- `GET /api/v1/cart` - Get cart items
- `POST /api/v1/cart/products` - Add products to cart
- `PATCH /api/v1/cart/products` - Update product quantity
- `DELETE /api/v1/cart/products` - Remove products from cart
- `POST /api/v1/cart/checkout` - Checkout cart

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd hytani-shop
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_LIFETIME=1d
```

4. Run the development server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
npm start
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs before storage
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Protection against brute force attacks (100 requests per 15 minutes)
- **XSS Protection**: Input sanitization to prevent cross-site scripting
- **Helmet**: Security headers to protect against common vulnerabilities
- **CORS**: Configurable cross-origin resource sharing

## Error Handling

The application includes comprehensive error handling:

- Custom error classes for different error types
- Centralized error handling middleware
- Consistent error response format

## Database Models

- **User**: Stores user credentials and authentication data
- **UserProfile**: Extended user information and profile data
- **Product**: Product catalog with categories, pricing, and metadata
- **Cart**: User shopping cart with items and quantities
- **UserBalance**: User account balance for transactions

## Development

The project uses:

- TypeScript for type safety
- Nodemon for hot-reloading during development
- Path aliases (`@/`) for cleaner imports

## License

DongLee
