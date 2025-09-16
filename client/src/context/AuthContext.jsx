import React, { createContext, useContext, useState } from 'react';
import AuthRedirectAnimation from '../components/auth/AuthRedirectAnimation';
import ProfileCompletionModal from '../components/auth/ProfileCompletionModal';
import OnboardingWizard from '../components/onboarding/OnboardingWizard';
import ProfileCelebration from '../components/ui/ProfileCelebration';

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
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthAnimation, setShowAuthAnimation] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/');
  const [userType, setUserType] = useState('volunteer');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Simulate checking if profile is complete
  const isProfileComplete = (userData) => {
    return userData?.profileCompleted || false;
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    
    if (isProfileComplete(userData)) {
      // Profile complete → go to dashboard
      setRedirectPath('/dashboard');
      setShowAuthAnimation(true);
    } else {
      // Profile incomplete → show modal
      setShowProfileModal(true);
    }
  };

  const login = async (credentials) => {
    setIsLoading(true);
    setUserType(credentials.userType || 'volunteer');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate API response - check if user exists and profile status
      const userData = {
        id: 'user_123',
        email: credentials.email,
        userType: credentials.userType || 'volunteer',
        profileCompleted: false, // This would come from backend
        firstName: 'John', // Example - would come from backend if profile exists
        lastName: 'Doe'
      };
      
      handleAuthSuccess(userData);
      
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    setUserType(userData.userType);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: 'new_user_456',
        email: userData.email,
        userType: userData.userType,
        profileCompleted: false // New users always need to complete profile
      };
      
      handleAuthSuccess(newUser);
      
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (profileData) => {
    try {
      // Simulate API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user with completed profile and all the data
      setUser(prev => ({
        ...prev,
        ...profileData,
        profileCompleted: true,
        firstName: profileData.fullName?.split(' ')[0] || 'User',
        lastName: profileData.fullName?.split(' ').slice(1).join(' ') || ''
      }));
      
      // Show confetti celebration
      setShowConfetti(true);
      
    } catch (error) {
      console.error('Profile completion failed:', error);
      throw error;
    }
  };

  const handleProfileModalConfirm = () => {
    setShowProfileModal(false);
    setShowOnboarding(true);
  };

  const handleProfileModalCancel = () => {
    setShowProfileModal(false);
    // If user skips, still redirect to dashboard but with incomplete profile
    setRedirectPath('/dashboard');
    setShowAuthAnimation(true);
  };

  const handleOnboardingComplete = (profileData) => {
    setShowOnboarding(false);
    completeOnboarding(profileData);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
    setRedirectPath('/dashboard');
    setShouldRedirect(true); // Trigger the redirect
  };

  const handleAnimationComplete = () => {
    setShowAuthAnimation(false);
    setShouldRedirect(true); // Trigger the redirect
  };

  // Function to get the current redirect state
  const getRedirectState = () => {
    return {
      shouldRedirect,
      redirectPath,
      resetRedirect: () => {
        setShouldRedirect(false);
        setRedirectPath('/');
      }
    };
  };

  const logout = () => {
    setUser(null);
    setShowAuthAnimation(false);
    setShowProfileModal(false);
    setShowOnboarding(false);
    setShowConfetti(false);
    setShouldRedirect(false);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
    isAuthenticated: !!user,
    completeOnboarding,
    getRedirectState
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      
      {/* Auth Animation */}
      {showAuthAnimation && (
        <AuthRedirectAnimation 
          onAnimationComplete={handleAnimationComplete} 
          userType={userType}
        />
      )}
      
      {/* Profile Completion Modal */}
      <ProfileCompletionModal
        isOpen={showProfileModal}
        onConfirm={handleProfileModalConfirm}
        onCancel={handleProfileModalCancel}
      />
      
      {/* Onboarding Wizard */}
      {showOnboarding && (
        <OnboardingWizard
          onComplete={handleOnboardingComplete}
          onSkip={() => setShowOnboarding(false)}
        />
      )}
      
      {/* Profile Celebration */}
      {showConfetti && (
        <ProfileCelebration onComplete={handleConfettiComplete} />
      )}
    </AuthContext.Provider>
  );
};