import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ConfigModule } from '@nestjs/config';
import { SmsModule } from 'src/sms/sms.module';

@Module({
  imports: [ConfigModule, SmsModule],
  controllers: [AdminController],
})
export class AdminModule {}
