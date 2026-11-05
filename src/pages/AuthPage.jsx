import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:5000/api/auth';

const AuthPage = ({ isRegister = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const endpoint = isRegister ? `${API_URL}/register` : `${API_URL}/login`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Có lỗi xảy ra');
      }

      loginSuccess(data.user, data.token);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>{isRegister ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập Chợ Đồ Cũ'}</h2>
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label>Họ và tên</label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Tối thiểu 6 ký tự"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {isRegister && (
            <>
              <div className="form-group">
                <label>Số điện thoại liên hệ</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="0912345678"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Địa chỉ giao nhận</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Hà Nội"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Đang xử lý...' : isRegister ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
          {isRegister ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
          <Link to={isRegister ? '/login' : '/register'} style={{ color: '#d32f2f', fontWeight: '600' }}>
            {isRegister ? 'Đăng nhập' : 'Đăng ký tại đây'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
