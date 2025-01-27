const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// MongoDB Schema
const orderSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  quantity: Number,
  paymentMethod: String,
  customerName: String,
  customerAddress: String,
  customerPhone: String,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// API Endpoint to Save Order
app.post('/api/order', async (req, res) => {
  const { productName, price, quantity, paymentMethod, customerName, customerAddress, customerPhone } = req.body;

  const order = new Order({
    productName,
    price,
    quantity,
    paymentMethod,
    customerName,
    customerAddress,
    customerPhone
  });

  try {
    await order.save();
    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
