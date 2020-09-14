import { Task } from './tasks.model';
import { Injectable } from '@nestjs/common'

@Injectable() // Makes it available for injection in other modules.
export class TasksService {
  private tasks: Task[] = []

  getAllTasks() {
    return this.tasks
  }
}
