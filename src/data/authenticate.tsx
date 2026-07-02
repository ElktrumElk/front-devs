import api from '../api/client';

export async function userAuthentication() {
  const token = localStorage.getItem('token');
  if (!token) {
    return { loginResponse: { status: 'fulfilled', value: null }, emailResponse: { status: 'fulfilled', value: null } };
  }

  try {
    const { data } = await api.get('/auth/me');
    return {
      loginResponse: { status: 'fulfilled', value: true },
      emailResponse: { status: 'fulfilled', value: data.isEmailVerified || null },
    };
  } catch {
    localStorage.removeItem('token');
    localStorage.removeItem('data');
    return { loginResponse: { status: 'fulfilled', value: null }, emailResponse: { status: 'fulfilled', value: null } };
  }
}
