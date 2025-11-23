# 🛍️ Halal Store Mobile App

Modern e-commerce mobile app for halal products with full backend support.

## ✨ Features

- 📱 Mobile-first responsive design
- 🌙 Dark/Light mode
- 🌍 Multi-language (English, Spanish, Arabic)
- 🛒 Shopping cart with checkout
- 📦 Order tracking with delivery codes
- 💳 Nequi payment integration (+57 321 5874058)
- 🎨 Dynamic product slider
- 👨‍💼 Admin panel for managing products/orders
- 🔐 User authentication
- 📍 GPS location tracking

## 🚀 Tech Stack

- **Frontend:** React (via CDN), TailwindCSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Deployment:** Render

## 📦 Installation

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/halal-store.git
cd halal-store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create `.env` file:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=your_postgresql_connection_string
```

### 4. Run Server

```bash
npm start
```

Server will run on `http://localhost:3000`

## 🌐 Deployment on Render

### Step 1: Create PostgreSQL Database

1. Go to [render.com](https://render.com)
2. Click **New +** → **PostgreSQL**
3. Name: `halal-store-db`
4. Copy the **Internal Database URL**

### Step 2: Deploy Web Service

1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variable:
   - Key: `DATABASE_URL`
   - Value: [Your PostgreSQL connection string]
5. Click **Create Web Service**

⏱️ Wait 2-3 minutes and your app will be live!

## 📁 Project Structure

```
halal-store/
├── server.js          # Backend API
├── package.json       # Dependencies
├── .env              # Environment variables
├── public/
│   └── index.html    # Frontend app
└── README.md         # Documentation
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Add product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (Admin)

### Slides
- `GET /api/slides` - Get all slides
- `POST /api/slides` - Add slide (Admin)
- `PUT /api/slides/:id` - Update slide (Admin)
- `DELETE /api/slides/:id` - Delete slide (Admin)

### Users
- `POST /api/users` - Register/Login user
- `GET /api/users/:email` - Get user by email

## 🔐 Admin Access

- **Email:** elhocineboul@gmail.com
- **Password:** wizardgoo1020

## 📞 Contact

WhatsApp: +57 321 5874058

## 📄 License

MIT License