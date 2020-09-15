import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CreateTaskDTO } from './dto/create-task.dto'
import { Task } from './task.entity'
import { TasksService } from './tasks.service'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { UpdateTaskDTO } from './dto/update-task.dto'
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto'

@Controller('tasks') //? Any routes dealing with tasks will be handled by this controller
export class TasksController {
  //? The constructor allows any method to have access to our service
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO) {
    return this.tasksService.getTasks(filterDTO)
  }
s
  @Get('/:uuid')
  getTaskByUUID(@Param('uuid') uuid: string): Promise<Task> {
    return this.tasksService.getTaskByUUID(uuid)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO)
  }

  @Patch('/:uuid')
  updateTask(
    @Param('uuid') uuid: string,
    @Body(TaskStatusValidationPipe)
    updateTaskDTO: UpdateTaskDTO,
  ): Promise<Task> {
    return this.tasksService.updateTask(uuid, updateTaskDTO)
  }

  @Delete('/:uuid')
  deleteTask(@Param('uuid') uuid: string): Promise<void> {
    return this.tasksService.deleteTask(uuid)
  }
}
