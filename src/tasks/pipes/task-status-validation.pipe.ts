import { TaskStatus } from './../tasks.model'
import { BadRequestException, PipeTransform } from '@nestjs/common'

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [TaskStatus.OPEN, TaskStatus.INPROGRESS, TaskStatus.DONE]

  transform(value: any) {
    value = value.toUpperCase()
    if (!this.isValid(value)) {
      throw new BadRequestException(`Invalid status: ${value}`)
    }
    return value
  }

  private isValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status)
    return idx !== -1
  }
}
