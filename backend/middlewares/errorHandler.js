class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Lỗi máy chủ nội bộ (Internal Server Error)';

  // Bắt lỗi trùng lặp dữ liệu trong MongoDB (ví dụ: đăng ký trùng Email)
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Dữ liệu đã tồn tại trong hệ thống';
  }

  // Bắt lỗi truyền sai định dạng ID của MongoDB (ví dụ: ID sản phẩm không hợp lệ)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Định dạng ID không hợp lệ';
  }

  // Bắt lỗi nhập thiếu hoặc sai quy tắc dữ liệu từ Mongoose Schema
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

module.exports = { AppError, errorHandler };