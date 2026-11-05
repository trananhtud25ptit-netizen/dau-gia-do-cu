const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');
const User = require('../models/User');

// Middleware kiểm tra JWT (Bảo vệ các API đăng bán của TV2, đặt giá của TV3)
const verifyToken = async (req, res, next) => {
  try {
    let token;

    // Lấy token từ Header: Authorization: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError('Bạn cần đăng nhập để thực hiện chức năng này', 401)
      );
    }

    // Giải mã token lấy id người dùng
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Tìm người dùng trong Database (bỏ qua trường password)
    const currentUser = await User.findById(decoded.id).select('-password');
    if (!currentUser) {
      return next(
        new AppError('Người dùng sở hữu token này không còn tồn tại', 401)
      );
    }

    // Gắn thông tin user vào req.user để TV2, TV3 lấy được ID người bán/người đặt giá
    req.user = currentUser;
    next();
  } catch (error) {
    return next(
      new AppError('Token không hợp lệ hoặc phiên đăng nhập đã hết hạn', 401)
    );
  }
};

// Middleware kiểm tra quyền Admin (Dùng khi Admin cần xóa sản phẩm vi phạm của TV2)
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return next(
      new AppError('Chỉ Quản trị viên (Admin) mới có quyền thực hiện', 403)
    );
  }
};

module.exports = { verifyToken, verifyAdmin };