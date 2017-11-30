import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable()
export class AnalyticsService {

  constructor() {
    gtag('config', environment.gaTrackingId);
  }

  pageview(
    appId: string = null,
    appInstallerId: string = null,
  ) {
    gtag('event', 'screen_view', {
      'app_id': appId,
      'app_version': environment.version,
      'app_installer_id': appInstallerId,
    });
  }

  event(
    name: string,
    category: string = null,
    action: string = null,
    label: string = null,
    value: number = null,
  ) {
    gtag('event', name, {
      'event_category': category,
      'event_action': action,
      'event_label': label,
      'event_value': value,
    });
  }

}
