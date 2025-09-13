import React from 'react';
import { useNotification } from '../../context/NotificationContext';

const Notification = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg border-l-4 min-w-80 max-w-sm transition-all duration-300 ${
            notification.type === 'error'
              ? 'bg-red-50 border-red-500 text-red-700'
              : notification.type === 'success'
              ? 'bg-green-50 border-green-500 text-green-700'
              : 'bg-blue-50 border-blue-500 text-blue-700'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;