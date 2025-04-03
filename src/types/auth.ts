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
  refreshToken: string;
  user: User;
  accessToken: string;
}
