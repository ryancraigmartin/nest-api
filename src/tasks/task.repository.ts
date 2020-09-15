import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDTO } from './dto/create-task.dto'
import { Task } from './task.entity'
import { TaskStatus } from './tasks-status.enum'
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    const { status, searchTerm } = filterDTO
    console.log('status: ', status);
    const query = this.createQueryBuilder('tasks')
    if (status) query.andWhere('tasks.status = :status', {status})
    if (searchTerm) query.andWhere(
      'tasks.title LIKE :searchTerm OR tasks.description LIKE :searchTerm', { searchTerm: `%${searchTerm}%` }
    )
    const tasks = await query.getMany()
    console.log('tasks: ', tasks);
    return tasks
  }

  async createTask(createData: CreateTaskDTO): Promise<Task> {
    const { title, description } = createData
    const task = new Task()
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    await task.save()
    return task
  }
}
