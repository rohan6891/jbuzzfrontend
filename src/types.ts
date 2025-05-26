export interface Notification {
  id: string;
  title: string;
  date: string;
  link: string;
  isNew?: boolean;
  category: string; // Matches backend's notificationType: "Latest", "Exam", "Result", or "Notice"
}