const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product'); // ใช้โมเดลของคุณ

const app = express();

// เพิ่ม middleware นี้เพื่อให้ Express อ่านข้อมูล JSON จาก request body
app.use(express.json());

app.post('/api/products', async (req, res) => {
  try {
    console.log(req.body); // ดูว่า body ส่งมาถูกต้องหรือไม่

    const { name, price } = req.body;

    // ตรวจสอบว่า name และ price ไม่เป็น null หรือ undefined
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const product = new Product({ name, price });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ให้ Express ฟังที่ port 5000
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
