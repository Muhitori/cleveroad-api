import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  PayloadTooLargeException
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(PayloadTooLargeException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    response.status(422).json({
      field: "image",
      message: "The file is too big"
    })
  }
}
