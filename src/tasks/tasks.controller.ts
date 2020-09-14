import { TasksService } from './tasks.service'
import { Controller } from '@nestjs/common'

@Controller('tasks') //? Any routes dealing with tasks will be handled by this controller
export class TasksController {
  constructor(private tasksService: TasksService) {
    //? Allows any method to have access to our service
  }
}
