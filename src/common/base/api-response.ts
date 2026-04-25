import { HttpStatus } from '@nestjs/common';
import { ApiResponseKey } from 'src/enum/api-response-key.enum';

export class ApiResponse {
  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  static ok<T>(
    data: T,
    message: string = '',
    httpStatus: number = HttpStatus.OK,
  ): Record<string, unknown> {
    return {
      [ApiResponseKey.STATUS]: true,
      [ApiResponseKey.CODE]: httpStatus,
      [ApiResponseKey.DATA]: data,
      [ApiResponseKey.MESSAGE]: message,
      [ApiResponseKey.TIMESTAMP]: this.getTimestamp(),
    };
  }

  static error<T>(
    error: T,
    message: string,
    httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ): Record<string, unknown> {
    return {
      [ApiResponseKey.STATUS]: false,
      [ApiResponseKey.CODE]: httpStatus,
      [ApiResponseKey.DATA]: error,
      [ApiResponseKey.MESSAGE]: message,
      [ApiResponseKey.TIMESTAMP]: this.getTimestamp(),
    };
  }

  static message(
    message: string,
    httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ): Record<string, unknown> {
    return {
      [ApiResponseKey.STATUS]:
        httpStatus === HttpStatus.OK || httpStatus === HttpStatus.CREATED,
      [ApiResponseKey.MESSAGE]: message,
      [ApiResponseKey.TIMESTAMP]: this.getTimestamp(),
    };
  }
}
