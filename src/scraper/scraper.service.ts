import { Injectable, Logger, HttpService } from '@nestjs/common';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import cheerio = require('cheerio');
@Injectable()
export class ScraperService {
  logger = new Logger(ScraperService.name);
  constructor(private http: HttpService) {
    this.logger.verbose('constructing Scraper');
  }
  get(url: string): Observable<any> {
    this.logger.log('Getting URL:' + url);
    const res = this.http
      .get(url)
      .pipe(map((value: AxiosResponse) => value.data));
    this.logger.verbose('returning res');
    return res;
  }
  getTitle(url: string) {
    return this.get(url).pipe(
      map((html: string) => this.getTitleFromDom(html)),
    );
  }
  private getTitleFromDom(html: string) {
    return cheerio
      .load(html)('title')
      .text();
  }
}
