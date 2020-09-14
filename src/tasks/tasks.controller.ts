import { CreateTaskDTO } from './dto/create-task.dto'
import { Task } from './tasks.model'
import { TasksService } from './tasks.service'
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'

@Controller('tasks') //? Any routes dealing with tasks will be handled by this controller
export class TasksController {
  //? The constructor allows any method to have access to our service
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks()
  }

  @Get('/:uuid')
  getTaskById(@Param('uuid') uuid: string): Task {
    return this.tasksService.getTaskByUUID(uuid)
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO)
  }

  @Delete('/:uuid')
  deleteTask(@Param('uuid') uuid: string): void {
    return this.tasksService.deleteTask(uuid)
  }
}
