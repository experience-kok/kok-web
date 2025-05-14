// 프로필 이미지 타입
export type ProfileImageExtension = 'jpg' | 'jpeg' | 'png';

// 이미지 업로드 URL 생성 응답
export interface PostPresignedUrlResponse {
  presignedUrl: string;
}
