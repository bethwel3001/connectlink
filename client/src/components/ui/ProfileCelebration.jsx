import React, { useEffect, useState } from 'react';

const ProfileCelebration = ({ onComplete, user }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 1500);
    const timer2 = setTimeout(() => setStep(3), 3000);
    const timer3 = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  const displayName = user?.firstName || 'there';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="text-center text-white max-w-md mx-4">
        {/* Animated Connection Visualization */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          {/* Network lines animation */}
          <div className="absolute inset-0 opacity-60">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full animate-ping"
                style={{
                  left: `${25 + (i % 3) * 25}%`,
                  top: `${25 + Math.floor(i / 3) * 25}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>

          {/* Central icon with pulse effect */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
            step >= 2 ? 'scale-110' : 'scale-100'
          }`}>
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-3xl">🤝</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold mb-2">
            {step === 1 && 'Building Your Network...'}
            {step === 2 && 'Profile Complete!'}
            {step === 3 && `Welcome, ${displayName}!`}
          </h2>
          
          <p className="text-green-200">
            {step === 1 && 'Connecting you with opportunities...'}
            {step === 2 && 'Your profile is now active and visible'}
            {step === 3 && 'Ready to make a difference together'}
          </p>

          {step === 3 && (
            <div className="pt-4">
              <div className="flex justify-center space-x-2">
                {['🙋‍♂️', '🌱', '🚀', '🌟'].map((emoji, index) => (
                  <span
                    key={index}
                    className="text-2xl animate-bounce"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCelebration;