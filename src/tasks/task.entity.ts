import { TaskStatus } from './tasks-status.enum'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  uuid: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: TaskStatus
}
