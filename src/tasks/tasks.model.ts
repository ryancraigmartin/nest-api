import { TaskStatus } from './tasks-status.enum'
export interface Task {
  uuid: string
  title: string
  description: string
  status: TaskStatus
}
