export interface SuccessResponse<T> {
  data: T;
  status: number;
  message: string;
  success: true;
}

export interface ErrorResponse {
  errorCode: string;
  status: number;
  message: string;
  success: false;
}
