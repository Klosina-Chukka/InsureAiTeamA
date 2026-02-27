import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Skip the API call for now and use stored data
        const userRole = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');
        const userEmail = localStorage.getItem('userEmail');
        const userFirstName = localStorage.getItem('userFirstName');
        const userLastName = localStorage.getItem('userLastName');
        
        if (token && userRole) {
          setUser({
            id: userId,
            email: userEmail,
            firstName: userFirstName,
            lastName: userLastName,
            role: userRole,
            emailVerified: true
          });
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials);
      console.log('Login response:', response.data); // Debug log
      
      const { accessToken, refreshToken, userId, email, firstName, lastName, role, emailVerified } = response.data;
      
      if (!accessToken || !role) {
        throw new Error('Invalid response from server');
      }
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userFirstName', firstName);
      localStorage.setItem('userLastName', lastName);
      
      API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      setUser({
        id: userId,
        email,
        firstName,
        lastName,
        role,
        emailVerified
      });
      setIsAuthenticated(true);
      
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error); // Debug log
      const message = error.response?.data?.message || error.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await API.post('/auth/register', userData);
      const { accessToken, refreshToken, userId, email, firstName, lastName, role, emailVerified } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userRole', role);
      
      API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      setUser({
        id: userId,
        email,
        firstName,
        lastName,
        role,
        emailVerified
      });
      setIsAuthenticated(true);
      
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    delete API.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await API.post('/auth/refresh-token', refreshToken);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      
      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      
      API.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return false;
    }
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const isAdmin = () => hasRole('ADMIN');
  const isAgent = () => hasRole('AGENT');
  const isCustomer = () => hasRole('CUSTOMER');

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
    hasRole,
    isAdmin,
    isAgent,
    isCustomer,
    fetchCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
