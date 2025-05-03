import { User } from 'types/auth';

// 유저 정보 조회 응답
export interface GetProfileResponse {
  user: User;
}

// 유저 정보 수정 응답
export interface PutProfileResponse {
  user: User;
}
