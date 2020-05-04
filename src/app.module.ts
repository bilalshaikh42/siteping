import { Module, Logger } from '@nestjs/common';
import { PingController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';

import { SchedulerModule } from './scheduler/scheduler.module';
import { SchedulerService } from './scheduler/scheduler.service';

import { ScraperService } from './scraper/scraper.service';
import { ScraperModule } from './scraper/scraper.module';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
@Module({
  controllers: [PingController],

  imports: [ScheduleModule.forRoot(), SchedulerModule, ScraperModule],
})
export class AppModule {
  logger = new Logger(AppModule.name);
  constructor(
    schedulerService: SchedulerService,
    scraperService: ScraperService,
  ) {
    const callback = () => {
      this.logger.log('Calling Scraper Service');
      const html: Observable<any> = scraperService.getTitle(
        'https://apps.aamc.org/mrs',
      );

      html.subscribe((res: any) => {
        this.logger.log(res);
      });
    };
    schedulerService.addInterval('mcat', 10000, callback);
  }
}
