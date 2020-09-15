import { TypeOrmModuleOptions} from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ryan',
  password: process.env.DATABASE_PASSWORD,
  database: 'taskmanager',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
}