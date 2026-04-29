import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { IApiResponse } from '../interfaces/api-response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    let message: any = 'Internal server error';

    if (exceptionResponse && typeof exceptionResponse === 'object') {
      const resObj = exceptionResponse as Record<string, unknown>;
      message = resObj.message || resObj.error || JSON.stringify(resObj);
    } else if (exceptionResponse) {
      message = exceptionResponse;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const finalMessage = Array.isArray(message) ? message : (message as string);

    const errorResponse: IApiResponse<null> = {
      success: false,
      statusCode: status,
      message: finalMessage,
      data: null,
      error: exception instanceof Error ? exception.name : 'UnknownError',
      timestamp: new Date().toISOString(),
    };
    response.status(status).json(errorResponse);
  }
}
