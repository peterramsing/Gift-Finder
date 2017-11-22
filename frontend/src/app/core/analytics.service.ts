import { Injectable } from '@angular/core';

import ua from 'universal-analytics';
import { environment } from '../../environments/environment';


@Injectable()
export class AnalyticsService {
  _ua: any;

  constructor() {
    this._ua = ua(environment.gaTrackingId);
  }

  pageview(page: string) {
    this._ua.pageview(page).send();
  }

  event(
    category: string = null,
    action: string = null,
    label: string = null,
    value: number = null
  ) {
    this._ua.event(category, action, label, value).send();
  }

}
