import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Button from '../ui/Button';

const AuthModal = ({ isOpen, onClose, defaultMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(defaultMode === 'login');
  const [userType, setUserType] = useState('volunteer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const { addNotification } = useNotification();

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation (for signup only)
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      addNotification('Please fix the errors in the form', 'error');
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      let result;
      
      if (isLogin) {
        result = await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        result = await register({
          email: formData.email,
          password: formData.password,
          userType: userType
        });
      }

      if (result.success) {
        setFormData({ email: '', password: '', confirmPassword: '' });
        onClose();
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear field error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleToggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ email: '', password: '', confirmPassword: '' });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isLoading}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-5 text-white text-center">
          <h2 className="text-lg font-bold">
            {isLogin ? 'Welcome Back' : 'Join ConnectLink'}
          </h2>
          <p className="text-xs opacity-90 mt-1">
            {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
          </p>
        </div>

        {/* User Type Selection (Signup only) */}
        {!isLogin && (
          <div className="px-5 pt-5">
            <label className="block text-xs font-medium text-gray-700 mb-2 text-center">
              I am a:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['volunteer', 'organization'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setUserType(type)}
                  disabled={isLoading}
                  className={`p-2 text-xs border rounded-lg transition-all ${
                    userType === type
                      ? 'border-green-500 bg-green-50 text-green-700 font-medium'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {type === 'volunteer' ? 'Volunteer' : 'Organization'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <div className="p-5">
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full justify-center py-2.5 text-sm font-medium rounded-lg"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          {/* Auth Toggle */}
          <p className="text-center text-xs text-gray-600 mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={handleToggleAuthMode}
              disabled={isLoading}
              className="text-green-600 hover:text-green-700 font-medium underline disabled:opacity-50"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;