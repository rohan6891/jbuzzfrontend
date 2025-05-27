// Centralized config for URLs and important variables
const API_BASE_URL = "http://localhost:5000/api";
// const API_BASE_URL = 'https://jbuzzbackend-production.up.railway.app/api';

export const CONFIG = {
  API: {
    BASE_URL: API_BASE_URL,
    NOTIFICATIONS: (college: 'jntuk' | 'jntuh') => `${API_BASE_URL}/notifications/${college}`,
    SCRAPE: (college: 'jntuk' | 'jntuh') => `${API_BASE_URL}/scrape/${college}`,
  },
  COLLEGES: {
    JNTUK: {
      NAME: 'JNTUK',
      OFFICIAL_URL: 'https://jntuk.edu.in',
    },
    JNTUH: {
      NAME: 'JNTUH',
      OFFICIAL_URL: 'https://jntuh.ac.in',
    },
  },
  APP: {
    NAME: 'JBuzz',
    DESCRIPTION: 'Get latest notifications and results from JNTUK and JNTUH.',
  },
  // Add more variables as needed
};

export default CONFIG;