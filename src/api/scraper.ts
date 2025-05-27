import axios from 'axios';
import { Notification } from '../types';
import CONFIG from '../config';

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
    const url = CONFIG.API.NOTIFICATIONS(college);
    const response = await axios.get<ScrapeResponse>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notifications for ${college}:`, error);
    throw error;
  }
};

export const triggerManualScrape = async (college: 'jntuk' | 'jntuh'): Promise<ManualScrapeResponse> => {
  try {
    const url = CONFIG.API.SCRAPE(college);
    const response = await axios.post<ManualScrapeResponse>(url);
    return response.data;
  } catch (error) {
    console.error(`Error triggering manual scrape for ${college}:`, error);
    throw error;
  }
};