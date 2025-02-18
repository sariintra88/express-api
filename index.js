const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Import Routes
const productRoutes = require('./routes/productRoutes');

// Middleware
app.use(cors());
app.use(express.json());  // ใช้ express.json() แทน body-parser

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// เส้นทางทดสอบ API
app.get('/', (req, res) => {
    res.send('🎉 Welcome to REST API!');
});

// ใช้ Routes สำหรับ /api
app.use('/api', productRoutes);

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
