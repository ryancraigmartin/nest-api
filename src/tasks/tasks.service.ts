import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto'
import { UpdateTaskDTO } from './dto/update-task.dto'
import { CreateTaskDTO } from './dto/create-task.dto'
import { Task, TaskStatus } from './tasks.model'
import { Injectable, NotFoundException } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

@Injectable() //? Makes it available for injection in other modules.
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    if (!this.tasks) throw new NotFoundException(`No tasks available`)
    return this.tasks
  }

  getTasksWithFilters(filters: GetTasksFilterDTO): Task[] {
    const { status, searchTerm } = filters
    let tasks = this.getAllTasks()

    if (status) tasks = tasks.filter(task => task.status === status)
    console.log('tasks: ', tasks);
    if (searchTerm) {
      tasks = tasks.filter(
        task => task.title.includes(searchTerm) || task.description.includes(searchTerm),
      )
    }

    return tasks
  }

  getTaskByUUID(uuid: string): Task {
    const found = this.tasks.find(task => task.uuid === uuid)

    if (!found) {
      throw new NotFoundException(`Task with UUID: ${uuid} not found`)
    }

    return found
  }

  createTask(createData: CreateTaskDTO): Task {
    const { title, description } = createData
    const task: Task = {
      uuid: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    }
    this.tasks.push(task)
    return task
  }

  updateTask(uuid: string, updatedData: UpdateTaskDTO): Task {
    const task = this.getTaskByUUID(uuid)
    return Object.assign(task, updatedData)
  }

  deleteTask(uuid: string): void {
    this.tasks = this.tasks.filter(task => task.uuid !== uuid)
  }
}
