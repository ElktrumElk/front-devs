import api from './client';
import type { AuthResponse } from './auth';

export interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
  img: string;
  timePosted: string;
  ratings: number;
  views: number;
  comment: number;
  preview: number;
  share: number;
  previewLink: string;
  tags: string[];
  authorId: string;
  author: AuthResponse['user'];
  createdAt: string;
}

export interface PostListResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}

export interface RatingBreakdown {
  average: number;
  total: number;
  breakdown: [number, number, number, number, number];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  author: AuthResponse['user'];
  postId: string;
}

export function getPosts(params?: { category?: string; page?: number; limit?: number }) {
  return api.get<PostListResponse>('/posts', { params });
}

export function searchPosts(params: { q: string; page?: number; limit?: number }) {
  return api.get<PostListResponse>('/posts/search', { params });
}

export function getCategories() {
  return api.get<string[]>('/posts/categories');
}

export function getPostById(id: string) {
  return api.get<Post>(`/posts/${id}`);
}

export function getUserPosts(username: string, params?: { page?: number; limit?: number }) {
  return api.get<PostListResponse>(`/posts/user/${username}`, { params });
}

export function createPost(dto: {
  title: string;
  description: string;
  category?: string;
  img?: string;
  previewLink?: string;
  tags?: string[];
}) {
  return api.post<Post>('/posts', dto);
}

export function deletePost(id: string) {
  return api.delete(`/posts/${id}`);
}

export function getComments(postId: string) {
  return api.get<Comment[]>(`/posts/${postId}/comments`);
}

export function addComment(postId: string, content: string) {
  return api.post<Comment>(`/posts/${postId}/comments`, { content });
}

export function getRatingBreakdown(postId: string) {
  return api.get<RatingBreakdown>(`/posts/${postId}/ratings`);
}

export function ratePost(postId: string, value: number) {
  return api.post(`/posts/${postId}/ratings`, { value });
}

export function getMyRating(postId: string) {
  return api.get<{ rating: number }>(`/posts/${postId}/ratings/me`);
}
