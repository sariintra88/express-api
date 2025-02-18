const express = require('express');
const Product = require('../models/Product');  // ใช้โมเดล Product ที่สร้างขึ้น
const router = express.Router();

// POST /api/products - เพิ่ม Product ใหม่
router.post('/products', async (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        const newProduct = new Product({ name, price });
        await newProduct.save();
        res.status(201).json(newProduct);  // ส่งกลับ Product ที่ถูกสร้าง
    } catch (err) {
        res.status(500).json({ message: err.message });  // ส่งกลับ error ถ้ามี
    }
});

// GET /api/products - ดึงข้อมูลทั้งหมดของ Products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);  // ส่งกลับข้อมูลทั้งหมดของ Products
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
