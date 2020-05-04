import { Injectable, Logger } from '@nestjs/common';
import Twilio = require('twilio');
import { ConfigService } from '@nestjs/config';
@Injectable()
export class SmsService {
  client;
  logger = new Logger(SmsService.name);
  sendNumber: any;
  constructor(configService: ConfigService) {
    this.client = Twilio(
      configService.get('TWILIO_SID'),
      configService.get('TWILIO_AUTH_TOKEN'),
    );
    this.sendNumber = configService.get('TWILIO_PHONE_NUMBER');
  }

  notify(number: string, message: string) {
    this.logger.log('Sending message:' + message + 'to' + number);
    this.client.messages
      .create({
        body: message,
        to: number, // Text this number
        from: this.sendNumber, // From a valid Twilio number
      })
      .then(message => console.log(message.sid));
  }
}
