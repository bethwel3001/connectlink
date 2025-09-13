import React, { useState } from 'react';
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
  const { addNotification } = useNotification();

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const successMessage = isLogin 
        ? '🎉 Welcome back! Successfully logged in.' 
        : '✨ Account created successfully!';
      
      addNotification(successMessage, 'success');
      setFormData({ email: '', password: '', confirmPassword: '' });
      onClose();
      
    } catch (err) {
      const errorMessage = isLogin
        ? '❌ Login failed. Please check your credentials.'
        : '❌ Signup failed. Please try again.';
      
      addNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleToggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ email: '', password: '', confirmPassword: '' });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-xs overflow-hidden relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1 shadow-md"
          aria-label="Close modal"
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

        {/* User Type for Signup */}
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
                  className={`p-2 text-xs border rounded-lg transition-all ${
                    userType === type
                      ? 'border-green-500 bg-green-50 text-green-700 font-medium'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {type === 'volunteer' ? 'Volunteer' : 'Organization'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <div className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
                disabled={isLoading}
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
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                }`}
                disabled={isLoading}
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
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  }`}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            <Button
              type="submit"
              className="w-full justify-center py-2.5 text-sm font-medium rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing in...' : 'Creating...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          {/* Auth Toggle Link */}
          <p className="text-center text-xs text-gray-600 mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={handleToggleAuthMode}
              className="text-green-600 hover:text-green-700 font-medium underline"
              disabled={isLoading}
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