import { useState, useEffect } from 'react';
import { USER_ROLES } from '../utils/constants';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('grooso-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('grooso-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('grooso-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('grooso-user');
    localStorage.removeItem('grooso-cart');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('grooso-user', JSON.stringify(updatedUser));
  };

  const isCustomer = () => {
    return user?.role === USER_ROLES.CUSTOMER;
  };

  return {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    isCustomer,
    isAuthenticated: !!user
  };
};