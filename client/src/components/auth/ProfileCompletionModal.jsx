import React from 'react';
import Button from '../ui/Button';

const ProfileCompletionModal = ({ isOpen, onConfirm, onCancel, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl">
        <div className="p-6 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Complete Your Profile
          </h2>
          
          <p className="text-gray-600 mb-6">
            To get personalized opportunities and connect with the right organizations, 
            we need to know more about you. This will only take 2 minutes!
          </p>

          <div className="space-y-3">
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full justify-center py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
            >
              {isLoading ? 'Loading...' : 'Complete My Profile'}
            </Button>
            
            <Button
              onClick={onCancel}
              disabled={isLoading}
              variant="outline"
              className="w-full justify-center py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Maybe Later
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            You can complete your profile anytime from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionModal;