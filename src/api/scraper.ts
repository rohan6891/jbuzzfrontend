import axios from 'axios';
import { Notification } from '../types';

interface ScrapeResponse {
  [college: string]: {
    latest: Notification[];
    notifications: Notification[];
    results: Notification[];
    lastScrape: string | null;
  };
}

interface ManualScrapeResponse {
  message: string;
  data: ScrapeResponse;
  timestamp: string;
}

export const fetchNotifications = async (college: 'jntuk' | 'jntuh'): Promise<ScrapeResponse> => {
  try {
    const response = await axios.get<ScrapeResponse>(`http://localhost:5000/api/notifications/${college}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notifications for ${college}:`, error);
    throw error;
  }
};

export const triggerManualScrape = async (college: 'jntuk' | 'jntuh'): Promise<ManualScrapeResponse> => {
  try {
    const response = await axios.post<ManualScrapeResponse>(`http://localhost:5000/api/scrape/${college}`);
    return response.data;
  } catch (error) {
    console.error(`Error triggering manual scrape for ${college}:`, error);
    throw error;
  }
};