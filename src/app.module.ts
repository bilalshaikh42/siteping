import { Module, Logger } from '@nestjs/common';
import { PingController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';

import { SchedulerModule } from './scheduler/scheduler.module';
import { SchedulerService } from './scheduler/scheduler.service';

@Module({
  controllers: [PingController],

  imports: [ScheduleModule.forRoot(), SchedulerModule],
})
export class AppModule {
  logger = new Logger(AppModule.name);
  constructor(schedulerService: SchedulerService) {
    const callback = () => this.logger.log('Service called');
    schedulerService.addInterval('mcat', 1000, callback);
  }
}
