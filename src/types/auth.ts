// 유저
export interface User {
  role: 'USER' | 'ADMIN';
  profileImage: string;
  email: string;
  nickname: string;
  id: number;
}

// 로그인 응답
export interface AuthResponse {
  user: User;
  refreshToken: string;
  accessToken: string;
  loginType: 'registration' | 'login';
}
