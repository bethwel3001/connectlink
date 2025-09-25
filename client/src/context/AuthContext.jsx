import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, usersAPI } from '../services/api';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Simple notification system
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Show profile modal if user is authenticated but profile is incomplete
  useEffect(() => {
    if (isAuthenticated && user && !user.profileCompleted) {
      // Small delay to allow dashboard to load first
      const timer = setTimeout(() => {
        setShowProfileModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user]);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await authAPI.getMe();
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(credentials);
      
      if (response.success) {
        const { token, data: { user } } = response;
        
        localStorage.setItem('token', token);
        setUser(user);
        setIsAuthenticated(true);
        
        showNotification('Successfully logged in!', 'success');
        return { success: true, user };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      console.error('Login error:', error);
      showNotification(message, 'error');
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      console.log('Registering user:', userData);
      
      const response = await authAPI.register(userData);
      console.log('Registration response:', response);
      
      if (response.success) {
        const { token, data: { user } } = response;
        
        localStorage.setItem('token', token);
        setUser(user);
        setIsAuthenticated(true);
        
        showNotification('Account created successfully! 🎉', 'success');
        
        // For new users, automatically show profile completion modal
        if (!user.profileCompleted) {
          setShowProfileModal(true);
        }
        
        return { success: true, user };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error details:', error);
      const message = error.response?.data?.message || error.message || 'Registration failed. Please try again.';
      showNotification(message, 'error');
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await usersAPI.updateProfile(profileData);
      
      if (response.success) {
        setUser(response.data.user);
        setShowOnboarding(false);
        
        // Show celebration after profile completion
        setShowCelebration(true);
        
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed.';
      showNotification(message, 'error');
      return { success: false, error: message };
    }
  };

  const completeOnboarding = (userData) => {
    setUser(userData);
    setShowCelebration(true);
    setShowOnboarding(false);
    showNotification('Profile completed successfully! 🎉', 'success');
  };

  const handleProfileModalConfirm = () => {
    setShowProfileModal(false);
    setShowOnboarding(true);
  };

  const handleProfileModalCancel = () => {
    setShowProfileModal(false);
    showNotification('You can complete your profile later from the dashboard.', 'info');
  };

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
    showNotification('Welcome to ConnectLink! Start exploring opportunities.', 'success');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setShowProfileModal(false);
    setShowOnboarding(false);
    setShowCelebration(false);
    showNotification('Logged out successfully', 'info');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    showProfileModal,
    showOnboarding,
    showCelebration,
    login,
    register,
    logout,
    updateProfile,
    completeOnboarding,
    handleProfileModalConfirm,
    handleProfileModalCancel,
    handleCelebrationComplete,
    checkAuthStatus,
    notification,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* Simple notification display */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notification.type === 'error' ? 'bg-red-500 text-white' :
          notification.type === 'success' ? 'bg-green-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}
    </AuthContext.Provider>
  );
};