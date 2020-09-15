import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult } from 'typeorm'
import { CreateTaskDTO } from './dto/create-task.dto'
import { UpdateTaskDTO } from './dto/update-task.dto'
import { Task } from './task.entity'
import { TaskRepository } from './task.repository'
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto'

@Injectable() //? Makes it available for injection in other modules.
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDTO)
  }

  async getTaskByUUID(uuid: string): Promise<Task> {
    const task = await this.taskRepository.findOne(uuid)
    if (!task) throw new NotFoundException(`Task with UUID: ${uuid} was not found`)
    return task
  }

  async createTask(createData: CreateTaskDTO): Promise<Task> {
    const task = await this.taskRepository.createTask(createData)
    if (!task) throw new InternalServerErrorException(`Error creating ${task}"`)
    return task
  }

  async updateTask(uuid: string, updatedData: UpdateTaskDTO): Promise<Task> {
    const task: Task = await this.getTaskByUUID(uuid)
    const { title, description, status } = updatedData
    task.title = title
    task.description = description
    task.status = status
    const result = await task.save()
    if (!result) throw new InternalServerErrorException(`Error updating ${task}"`)
    return result
  }

  async deleteTask(uuid: string): Promise<void> {
    const result: DeleteResult = await this.taskRepository.delete(uuid)
    if (result.affected === 0)
      throw new NotFoundException(`Task with UUID: "${uuid} was not found"`)
  }
}
