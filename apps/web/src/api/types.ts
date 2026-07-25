export interface ApiResponse<T> {
  success: boolean;
  data: T;
  requestId?: string;
}

export interface ApiError {
  success: false;

  error: {
    code: string;
    message: string;
    details?: unknown;
  };

  requestId?: string;
}
