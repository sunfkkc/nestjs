import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException('올바른 status 값이 아닙니다.');
    }
    return value;
  }

  private isStatusValid(status) {
    const isValid = this.StatusOptions.indexOf(status) !== -1;
    return isValid;
  }
}
