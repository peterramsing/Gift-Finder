import { Component } from '@angular/core';

import { AnalyticsService } from './core/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private _analytics: AnalyticsService,
  ) {
    this._analytics.pageview('/');
  }
}
