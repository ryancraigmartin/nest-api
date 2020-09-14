import { Task, TaskStatus } from './tasks.model';
import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'


@Injectable() //? Makes it available for injection in other modules.
export class TasksService {
  private tasks: Task[] = []

  getAllTasks() {
    return this.tasks
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      uuid: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    }
    this.tasks.push(task)
    return task
  }
}
