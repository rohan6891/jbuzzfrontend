import React from 'react';
import { Bell } from 'lucide-react';
import { Notification } from '../types';
import { format } from 'date-fns';

interface LatestPostsProps {
  notifications: Notification[];
}

const LatestPosts: React.FC<LatestPostsProps> = ({ notifications }) => {
  console.log('LatestPosts received notifications:', notifications);

  return (
    <div className="bg-white rounded-lg shadow-md border border-neutral-100 p-4">
      <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
        <Bell className="h-5 w-5 mr-2 text-primary-600" />
        Latest Updates
      </h2>
      
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-neutral-500 text-sm">No new notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="border-l-4 border-primary-500 pl-3 py-2 hover:bg-primary-50 transition-colors"
            >
              <a
                href={notification.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <p className="text-sm font-medium text-neutral-900 line-clamp-2 hover:text-primary-700">
                  {notification.title}
                </p>
                <div className="flex items-center mt-1 space-x-2">
                  <span className="text-xs text-neutral-500">
                    {format(new Date(notification.date), 'MMM d, yyyy')}
                  </span>
                  <span className="text-xs font-medium text-primary-600">{notification.category}</span>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestPosts;