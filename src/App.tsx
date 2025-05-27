import React, { useState, useEffect } from 'react';
import { Bell, RefreshCw, ExternalLink, Search, AlertCircle } from 'lucide-react';
import { fetchNotifications, triggerManualScrape } from './api/scraper';
import { Notification } from './types';
import NotificationCard from './components/NotificationCard';
import LatestPosts from './components/LatestPosts';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { formatDistanceToNow } from 'date-fns';
import CONFIG from './config'; // <-- import config

function App() {
  const [activeTab, setActiveTab] = useState<'jntuk' | 'jntuh'>('jntuk');
  const [latestPosts, setLatestPosts] = useState<Notification[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [results, setResults] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchNotificationsForCollege(activeTab);
  }, [activeTab]);

  const fetchNotificationsForCollege = async (college: 'jntuk' | 'jntuh') => {
    setLoading(true);
    setError(null);

    try {
      // Use config for API endpoint if needed
      const response = await fetchNotifications(college);
      const collegeData = response[college];
      setLatestPosts(collegeData.latest);
      setNotifications(collegeData.notifications);
      setResults(collegeData.results);
      setLastUpdated(collegeData.lastScrape ? new Date(collegeData.lastScrape) : null);
    } catch (err) {
      setError('Failed to fetch notifications. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Use config for API endpoint if needed
      const response = await triggerManualScrape(activeTab);
      const collegeData = response.data[activeTab];
      setLatestPosts(collegeData.latest);
      setNotifications(collegeData.notifications);
      setResults(collegeData.results);
      setLastUpdated(collegeData.lastScrape ? new Date(collegeData.lastScrape) : null);
    } catch (err) {
      setError('Failed to refresh notifications. Please try again later.');
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  // Combine notifications and results for the main list
  const combinedNotifications = [...notifications, ...results];

  const filteredNotifications = combinedNotifications.filter(notification => {
    return notification.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-primary-50">
      <header className="bg-primary-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-6 w-6" />
              <h1 className="text-2xl font-bold">{CONFIG.APP.NAME}</h1>
            </div>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <span className="text-sm text-primary-100">
                  Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
                </span>
              )}
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 rounded-full hover:bg-primary-600 transition-colors"
                aria-label="Refresh notifications"
              >
                <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="mb-6">
              <div className="flex border-b border-primary-200">
                <button
                  className={`px-6 py-3 font-medium text-sm rounded-t-lg ${
                    activeTab === 'jntuk'
                      ? 'text-primary-700 border-b-2 border-primary-700 bg-white'
                      : 'text-neutral-500 hover:text-neutral-700 hover:bg-primary-50'
                  }`}
                  onClick={() => setActiveTab('jntuk')}
                >
                  {CONFIG.COLLEGES.JNTUK.NAME} Notifications
                </button>
                <button
                  className={`px-6 py-3 font-medium text-sm rounded-t-lg ${
                    activeTab === 'jntuh'
                      ? 'text-primary-700 border-b-2 border-primary-700 bg-white'
                      : 'text-neutral-500 hover:text-neutral-700 hover:bg-primary-50'
                  }`}
                  onClick={() => setActiveTab('jntuh')}
                >
                  {CONFIG.COLLEGES.JNTUH.NAME} Notifications
                </button>
              </div>
            </div>

            <div className="mb-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg bg-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {loading && !refreshing ? (
              <Loader />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : filteredNotifications.length === 0 ? (
              <div className="text-center py-10">
                <AlertCircle className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900">No notifications found</h3>
                <p className="mt-2 text-sm text-neutral-500">
                  {searchQuery
                    ? "Try adjusting your search filters"
                    : "Check back later for updates"}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredNotifications.map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-80 shrink-0">
            <LatestPosts notifications={latestPosts} />
          </div>
        </div>
      </main>

      <footer className="bg-primary-100 border-t border-primary-200 mt-10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-neutral-600 text-sm">
            This application scrapes notifications from official {CONFIG.COLLEGES.JNTUK.NAME} and {CONFIG.COLLEGES.JNTUH.NAME} websites.
            <br />
            <a
              href={activeTab === 'jntuk' ? CONFIG.COLLEGES.JNTUK.OFFICIAL_URL : CONFIG.COLLEGES.JNTUH.OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-600 hover:underline"
            >
              Visit official website <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;