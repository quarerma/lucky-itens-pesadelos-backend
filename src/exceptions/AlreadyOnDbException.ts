import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyOnDbException extends HttpException {
  constructor() {
    super('Item já cadastrado', HttpStatus.CONFLICT);
  }
}
