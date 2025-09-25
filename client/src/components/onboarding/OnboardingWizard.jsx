import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Button from '../ui/Button';

const OnboardingWizard = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    location: '',
    city: '',
    skills: [],
    interests: [],
    specialization: '',
    availability: 'flexible',
    commitmentLevel: 'medium',
    bio: ''
  });

  const { updateProfile } = useAuth();
  const { addNotification } = useNotification();

  const steps = [
    { number: 1, title: 'Personal Info', icon: '👤' },
    { number: 2, title: 'Location', icon: '📍' },
    { number: 3, title: 'Skills & Interests', icon: '🎯' },
    { number: 4, title: 'Availability', icon: '⏰' }
  ];

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      setIsLoading(true);
      
      // Prepare data for API
      const profileData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        ...(formData.age && { age: parseInt(formData.age) }),
        ...(formData.gender && { gender: formData.gender }),
        ...(formData.location && { location: formData.location.trim() }),
        ...(formData.city && { city: formData.city.trim() }),
        ...(formData.skills.length > 0 && { 
          skills: Array.isArray(formData.skills) ? formData.skills : formData.skills.split(',').map(s => s.trim()).filter(s => s)
        }),
        ...(formData.interests.length > 0 && { 
          interests: Array.isArray(formData.interests) ? formData.interests : formData.interests.split(',').map(i => i.trim()).filter(i => i)
        }),
        ...(formData.specialization && { specialization: formData.specialization.trim() }),
        ...(formData.availability && { availability: formData.availability }),
        ...(formData.commitmentLevel && { commitmentLevel: formData.commitmentLevel }),
        ...(formData.bio && { bio: formData.bio.trim() })
      };

      const result = await updateProfile(profileData);
      
      if (result.success) {
        addNotification('Profile completed successfully!', 'success');
        onComplete(result.user);
      }
    } catch (error) {
      addNotification('Failed to complete profile. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Your first name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Your age"
                  min="16"
                  max="100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Your address or area"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Your city"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => handleInputChange('specialization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="e.g., Web Development, Teaching, Healthcare"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma separated)</label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="e.g., JavaScript, Teaching, First Aid"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
              <input
                type="text"
                value={formData.interests}
                onChange={(e) => handleInputChange('interests', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="e.g., Environment, Education, Technology"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select
                value={formData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="flexible">Flexible</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="specific">Specific days</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Commitment Level</label>
              <select
                value={formData.commitmentLevel}
                onChange={(e) => handleInputChange('commitmentLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="low">Low (1-5 hrs/week)</option>
                <option value="medium">Medium (5-15 hrs/week)</option>
                <option value="high">High (15+ hrs/week)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Tell us about yourself..."
                rows="3"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName.trim() && formData.lastName.trim();
      case 2:
        return true; // Location is optional
      case 3:
        return true; // Skills are optional
      case 4:
        return true; // Availability is optional
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Complete Your Profile</h2>
          <p className="text-sm opacity-90">Step {currentStep} of {steps.length}</p>
        </div>

        {/* Progress Steps */}
        <div className="px-6 pt-6">
          <div className="flex justify-between mb-6">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold ${
                  currentStep >= step.number
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <span className="text-xs text-gray-600">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {renderStepContent()}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 pb-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentStep === 1 || isLoading}
              className="px-4 py-2"
            >
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isStepValid() || isLoading}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : currentStep === steps.length ? (
                'Complete Profile'
              ) : (
                'Next'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;