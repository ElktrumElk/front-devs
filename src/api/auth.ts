import api from './client';

export interface SignupDto {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface VerifyEmailDto {
  email: string;
  code: string;
}

export interface AuthResponse {
  token: string;
  user: {
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
  };
}

export function signup(dto: SignupDto) {
  return api.post('/auth/signup', dto);
}

export function login(dto: LoginDto) {
  return api.post<AuthResponse>('/auth/login', dto);
}

export function verifyEmail(dto: VerifyEmailDto) {
  return api.post('/auth/verify-email', dto);
}

export function resendVerification(email: string) {
  return api.post('/auth/send-verification', { email });
}

export function getMe() {
  return api.get('/auth/me');
}
