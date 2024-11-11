import React, { useState, useEffect } from 'react';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Sample data, replace with actual data fetching logic
    const fetchNotifications = async () => {
      const newNotifications = [
        { id: 1, type: 'donation', message: 'New donation received for Education Project.' },
        { id: 2, type: 'volunteerComplete', message: 'Volunteer completed work on Animal Care Project.' },
        { id: 3, type: 'other', message: 'General update for Medical Aid Project.' },
      ];

      // Filter notifications for donations and completed volunteer work
      const filteredNotifications = newNotifications.filter(
        (notification) => notification.type === 'donation' || notification.type === 'volunteerComplete'
      );

      setNotifications(filteredNotifications);
    };

    fetchNotifications();
  }, []);

  // Dismiss a specific notification
  const dismissNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-[#5f1515] mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="p-3 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center">
              <p className="text-gray-700">{notification.message}</p>
              <button
                onClick={() => dismissNotification(notification.id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Dismiss
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No new notifications</p>
      )}
    </div>
  );
};

export default Notification;



