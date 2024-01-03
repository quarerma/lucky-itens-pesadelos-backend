import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorOnCreateItemException extends HttpException {
  constructor() {
    super('Erro ao criar item', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
