// 유저 타입
export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  phone: string | null;
  age: string | null;
  role: 'USER' | 'ADMIN';
}

// 로그인 응답
export interface AuthResponse {
  user: User;
  refreshToken: string;
  accessToken: string;
  loginType: 'registration' | 'login';
}
