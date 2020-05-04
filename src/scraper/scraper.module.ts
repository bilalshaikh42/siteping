import { Module, HttpModule } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Module({
  imports: [HttpModule],
  providers: [ScraperService],
  exports: [ScraperService],
})
export class ScraperModule {}
