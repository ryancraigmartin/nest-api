import { BadRequestException, PipeTransform } from '@nestjs/common'
import { TaskStatus } from './../tasks-status.enum'

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [TaskStatus.OPEN, TaskStatus.INPROGRESS, TaskStatus.DONE]

  transform(value: any) {
    const { status } = value
    status.toUpperCase()
    if (!this.isValid(status)) {
      throw new BadRequestException(`Invalid status: ${status}`)
    }
    return { status, ...value }
  }

  private isValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status)
    return idx !== -1
  }
}
