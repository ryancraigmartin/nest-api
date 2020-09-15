import { IsIn, IsNotEmpty, IsOptional } from 'class-validator'
import { TaskStatus } from './../tasks.model'

export class GetTasksFilterDTO {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.INPROGRESS, TaskStatus.DONE])
  status: TaskStatus

  @IsOptional()
  @IsNotEmpty()
  searchTerm: string
}
