import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  constructor(private scheduler: SchedulerRegistry) {}

  addInterval(name: string, milliseconds: number, callback: () => void) {
    const interval = setInterval(callback, milliseconds);
    this.scheduler.addInterval(name, interval);
  }

  deleteInterval(name: string) {
    this.scheduler.deleteInterval(name);
    this.logger.warn(`Interval ${name} deleted!`);
  }

  getIntervals() {
    const intervals = this.scheduler.getIntervals();
    intervals.forEach(key => this.logger.debug(`Interval: ${key}`));
    return intervals;
  }
}
