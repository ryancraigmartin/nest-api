import { TaskStatus } from './../tasks.model'

export class GetTasksFilterDTO {
  status: TaskStatus
  searchTerm: string
}
