import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Tự động khôi phục trạng thái đăng nhập từ localStorage khi tải lại trang
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, [token]);

  // Hàm gọi khi Đăng nhập hoặc Đăng ký thành công
  const loginSuccess = (userData, jwtToken) => {
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(jwtToken);
    setUser(userData);
  };

  // Hàm gọi khi người dùng cập nhật thông tin cá nhân
  const updateUserContext = (updatedUserData) => {
    localStorage.setItem('user', JSON.stringify(updatedUserData));
    setUser(updatedUserData);
  };

  // Hàm gọi khi Đăng xuất
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        loginSuccess,
        updateUserContext,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook tùy chỉnh để cả nhóm (TV1, TV2, TV3, TV4) lấy nhanh token và thông tin user
export const useAuth = () => useContext(AuthContext);