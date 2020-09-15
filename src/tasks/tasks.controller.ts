import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto'
import { UpdateTaskDTO } from './dto/update-task.dto'
import { CreateTaskDTO } from './dto/create-task.dto'
import { Task } from './tasks.model'
import { TasksService } from './tasks.service'
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

@Controller('tasks') //? Any routes dealing with tasks will be handled by this controller
export class TasksController {
  //? The constructor allows any method to have access to our service
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filters: GetTasksFilterDTO): Task[] {
    return Object.keys(filters).length
      ? this.tasksService.getTasksWithFilters(filters)
      : this.tasksService.getAllTasks()
  }

  @Get('/:uuid')
  getTaskById(@Param('uuid') uuid: string): Task {
    return this.tasksService.getTaskByUUID(uuid)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO)
  }

  @Patch('/:uuid')
  updateTask(
    @Param('uuid') uuid: string,
    @Body('status', TaskStatusValidationPipe) updateTaskDTO: UpdateTaskDTO,
  ): Task {
    return this.tasksService.updateTask(uuid, updateTaskDTO)
  }

  @Delete('/:uuid')
  deleteTask(@Param('uuid') uuid: string): void {
    return this.tasksService.deleteTask(uuid)
  }
}
