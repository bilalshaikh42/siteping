import { Controller, Get } from '@nestjs/common';

@Controller()
export class PingController {
  @Get()
  findAll(): string {
    return 'running';
  }
}
