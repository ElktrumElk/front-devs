import api from './client';

export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return api.post<{ url: string }>('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return api.post<{ url: string }>('/upload/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
