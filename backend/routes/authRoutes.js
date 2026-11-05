const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  deleteMyAccount,
} = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Các API không cần đăng nhập
router.post('/register', register);
router.post('/login', login);

// Các API bắt buộc đi qua middleware verifyToken
router.get('/me', verifyToken, getMe);
router.put('/profile', verifyToken, updateProfile);
router.delete('/profile', verifyToken, deleteMyAccount);

module.exports = router;