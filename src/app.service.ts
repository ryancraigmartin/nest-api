import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  serverStatus(): Record<string, unknown> {
    return { status: 'ok' }
  }
}
