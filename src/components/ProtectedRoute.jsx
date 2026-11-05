import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        Đang kiểm tra phiên đăng nhập...
      </div>
    );
  }

  // Nếu chưa đăng nhập -> Tự động đẩy về trang /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Nếu trang yêu cầu quyền Admin nhưng tài khoản chỉ là user thường -> Đẩy về trang chủ
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Hợp lệ -> Cho phép đi tiếp vào trang bên trong (Trang Đăng bán, Trang Cá nhân...)
  return <Outlet />;
};

export default ProtectedRoute;
