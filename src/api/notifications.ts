import api from './client';

export interface Notification {
  id: string;
  message: string;
  type: string;
  isUnread: boolean;
  createdAt: string;
  userId: string;
}

export function getNotifications() {
  return api.get<Notification[]>('/notifications');
}

export function getUnreadCount() {
  return api.get<{ unreadCount: number }>('/notifications/unread-count');
}

export function markAsRead(id: string) {
  return api.patch(`/notifications/${id}/read`);
}

export function markAllAsRead() {
  return api.patch('/notifications/read-all');
}
