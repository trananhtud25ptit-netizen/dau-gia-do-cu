import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#b71c1c' }}>
        Đấu Giá Chợ Đồ Cũ
      </div>
      <div className="nav-links">
        {!isAuthenticated ? (
          <>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/register">Đăng ký</Link>
          </>
        ) : (
          <>
            <span>Xin chào, <strong>{user?.fullName}</strong></span>
            <Link to="/profile">Hồ sơ cá nhân</Link>
            <button
              onClick={logout}
              style={{
                padding: '6px 12px',
                background: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Đăng xuất
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<AuthPage isRegister={false} />} />
          <Route path="/register" element={<AuthPage isRegister={true} />} />

          {/* Các trang bắt buộc đăng nhập do TV1 bảo vệ */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            {/* Nơi TV2 gắn thêm trang Đăng bán sản phẩm sau này */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

