import React, { useEffect, useState } from 'react';

const ConfettiCelebration = ({ onComplete }) => {
  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfetti(false);
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!confetti) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="text-center text-white">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-2">Profile Complete!</h2>
        <p className="text-lg">Welcome to the ConnectLink community!</p>
        
        {/* Confetti animation container */}
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
                backgroundColor: ['#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6'][i % 5]
              }}
            >
              {['🎉', '✨', '🌟', '🎊', '🥳'][i % 5]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfettiCelebration;