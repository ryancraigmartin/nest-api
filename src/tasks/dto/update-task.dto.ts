import { TaskStatus } from './../tasks-status.enum'

export class UpdateTaskDTO {
  title?: string
  description?: string
  status?: TaskStatus
}
