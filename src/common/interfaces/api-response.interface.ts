export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string | string[];
  error?: string;
  data: T;
  timestamp: string;
}
