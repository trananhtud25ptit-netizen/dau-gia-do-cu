require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { errorHandler, AppError } = require('./middlewares/errorHandler');

const app = express();

// Kết nối cơ sở dữ liệu MongoDB
connectDB();

// Middlewares cơ bản
app.use(cors());
app.use(express.json());

// Khai báo Routes của TV1
app.use('/api/auth', authRoutes);

// Nơi TV2, TV3, TV4 gắn thêm route sau này:
// app.use('/api/products', productRoutes);
// app.use('/api/bids', bidRoutes);

// Bắt lỗi đường dẫn không tồn tại (404)
app.use((req, res, next) => {
  next(new AppError(`Không tìm thấy đường dẫn ${req.originalUrl}`, 404));
});

// Middleware xử lý lỗi tập trung (luôn đặt ở cuối cùng)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});