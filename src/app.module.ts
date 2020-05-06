import { Module, Logger } from '@nestjs/common';

import { ScheduleModule } from '@nestjs/schedule';

import { SchedulerModule } from './scheduler/scheduler.module';
import { SchedulerService } from './scheduler/scheduler.service';

import { ScraperService } from './scraper/scraper.service';
import { ScraperModule } from './scraper/scraper.module';

import { Observable } from 'rxjs';
import { SmsModule } from './sms/sms.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { SmsService } from './sms/sms.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SchedulerModule,
    ScraperModule,
    SmsModule,
    ConfigModule.forRoot({
      envFilePath: ['config.env'],
    }),
    AdminModule,
  ],
})
export class AppModule {
  logger = new Logger(AppModule.name);
  private last = 'Service Temporarily Unavailable - AAMC';
  constructor(
    schedulerService: SchedulerService,
    scraperService: ScraperService,
    private smsService: SmsService,
    private config: ConfigService,
  ) {
    const callback = () => {
      this.logger.log('Calling Scraper Service');
      const html: Observable<any> = scraperService.getTitle(
        'https://apps.aamc.org/mrs',
      );

      html.subscribe(
        (res: any) => {
          if (res === this.last) {
            this.logger.log('No Change!');
          } else {
            this.last = res;
            this.logger.warn('Change Detected');
            this.smsService.notify(
              this.config.get('NOTIFICATION_NUMBER'),
              'Change detected in page!',
            );
          }
        },
        (error: any) => {
          this.logger.error(error);
        },
      );
    };
    schedulerService.addInterval('mcat', 3000, callback);
  }
}
