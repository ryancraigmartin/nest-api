import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import dotenv = require('dotenv')

const envParseResult = dotenv.config({ path: '.env' })
if (envParseResult.error) throw envParseResult.error

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}

bootstrap()
