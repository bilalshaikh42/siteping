import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SmsService } from 'src/sms/sms.service';

@Controller('admin')
export class AdminController {
  constructor(private configService: ConfigService, private sms: SmsService) {}
  @Get('config')
  view() {
    return this.configService.get<string>('TWILIO_SID');
  }
  @Get('send')
  send() {
    this.sms.notify(
      this.configService.get('NOTIFICATION_NUMBER'),
      'Welcome to MCAT Notifier. You will recieve a text when the MCAT registration page changes',
    );
  }
}
