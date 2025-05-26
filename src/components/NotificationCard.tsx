import React from 'react';
import { ExternalLink, Bell } from 'lucide-react';
import { Notification } from '../types';
import { format } from 'date-fns';

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-neutral-100">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <span className={`inline-flex items-center justify-center p-2 rounded-full ${getCategoryColor(notification.category)}`}>
              <Bell className="h-4 w-4 text-white" />
            </span>
            <span className="ml-2 text-sm font-medium text-neutral-500">
              {notification.category || 'Notification'}
            </span>
          </div>
          {notification.isNew && (
            <span className="bg-secondary-100 text-secondary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 hover:line-clamp-none transition-all duration-200">
          {notification.title}
        </h3>
        
        <div className="text-sm text-neutral-500 mb-4">
          {format(new Date(notification.date), 'MMM d, yyyy')}
        </div>
        
        <a
          href={notification.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        >
          View Details
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

function getCategoryColor(category: string): string {
  switch (category?.toLowerCase()) {
    case 'exam':
      return 'bg-primary-600';
    case 'results':
      return 'bg-secondary-600';
    case 'research':
      return 'bg-neutral-600';
    default:
      return 'bg-neutral-600';
  }
}

export default NotificationCard;