import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [], //? List of modules required by this module.
  exports: [], //? List of providers to export to other modules.
  controllers: [AppController], //? List of controllers to be instantiated within this module.
  providers: [AppService], //? List of providers to be available within this module via dep-injection.
})
export class AppModule {}
