const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize Database
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        old_price DECIMAL(10, 2),
        category VARCHAR(50),
        image TEXT,
        badge VARCHAR(50),
        rating DECIMAL(3, 2) DEFAULT 4.5
      );

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255),
        items JSONB NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'preparing',
        delivery_code INTEGER,
        payment_method VARCHAR(50),
        nequi_number VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS slides (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        subtitle VARCHAR(255),
        description TEXT,
        image TEXT,
        discount VARCHAR(50),
        cta VARCHAR(100)
      );
    `);

    // Insert default data
    const { rows } = await pool.query('SELECT COUNT(*) FROM products');
    if (parseInt(rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO products (name, price, old_price, category, image, badge, rating) VALUES
        ('Best Beef Steak', 150, 200, 'beef', 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500', 'BEST', 4.6),
        ('Chicken Premium', 170, 220, 'chicken', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500', 'NEW', 4.5),
        ('Lamb Chops', 280, 320, 'lamb', 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500', 'PREMIUM', 4.8);
      `);
    }

    console.log('✅ Database initialized');
  } catch (error) {
    console.error('❌ Database error:', error);
  }
}

// API Routes
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, price, old_price, category, image, badge } = req.body;
    const result = await pool.query(
      'INSERT INTO products (name, price, old_price, category, image, badge) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, price, old_price, category, image, badge]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { customer_name, items, total, delivery_code, payment_method, nequi_number } = req.body;
    const result = await pool.query(
      'INSERT INTO orders (customer_name, items, total, delivery_code, payment_method, nequi_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [customer_name, JSON.stringify(items), total, delivery_code, payment_method, nequi_number]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await initDatabase();
});