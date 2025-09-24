import React, { useEffect, useState } from 'react';

const AuthRedirectAnimation = ({ onAnimationComplete, userType }) => {
  const [stage, setStage] = useState(1); // 1: Connect, 2: Contribute, 3: Grow

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(2), 800);
    const timer2 = setTimeout(() => setStage(3), 1600);
    const timer3 = setTimeout(() => onAnimationComplete(), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onAnimationComplete]);

  const getWelcomeMessage = () => {
    if (userType === 'organization') {
      return 'Welcoming your organization...';
    }
    return 'Connecting you to opportunities...';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        {/* Animated Circles representing connection */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Outer circles that move inward */}
          <div className={`absolute inset-0 rounded-full border-4 border-green-200 transition-all duration-700 ${
            stage >= 2 ? 'scale-75' : 'scale-100'
          }`}></div>
          <div className={`absolute inset-4 rounded-full border-4 border-green-400 transition-all duration-700 ${
            stage >= 2 ? 'scale-75' : 'scale-100'
          }`}></div>
          
          {/* Central logo that appears in stage 3 */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl text-white font-bold">CL</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {stage === 1 && 'Connecting...'}
            {stage === 2 && 'Building your network...'}
            {stage === 3 && getWelcomeMessage()}
          </h3>
          <p className="text-sm text-gray-600">Almost there</p>
        </div>
      </div>
    </div>
  );
};

export default AuthRedirectAnimation;