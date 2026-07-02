import api from './client';

export interface UserProfile {
  id: string;
  username: string;
  fullname: string;
  email: string;
  bio: string;
  avatarUrl: string;
  usertag: string;
  ratingsTotal: number;
  followersCount: number;
  isEmailVerified: boolean;
}

export function getUserProfile(username: string) {
  return api.get<UserProfile>(`/users/${username}`);
}

export function updateProfile(dto: { fullname?: string; bio?: string; avatarUrl?: string }) {
  return api.patch<UserProfile>('/users/me', dto);
}

export function followUser(username: string) {
  return api.post(`/users/${username}/follow`);
}

export function unfollowUser(username: string) {
  return api.delete(`/users/${username}/follow`);
}

export function checkFollowing(username: string) {
  return api.get<{ following: boolean }>(`/users/${username}/follow/check`);
}

export function sendContact(username: string, message: string, contactInfo?: string) {
  return api.post(`/users/${username}/contact`, { message, contactInfo });
}
