import { Task } from './tasks.model';
import { TasksService } from './tasks.service'
import { Controller, Get, Post, Body } from '@nestjs/common'

@Controller('tasks') //? Any routes dealing with tasks will be handled by this controller
export class TasksController {
  //? The constructor allows any method to have access to our service
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks()
  }

  @Post()
  createTask(
    @Body() title: string,
    @Body() description: string
  ): Task {
    return this.tasksService.createTask(title, description)
  }
}
