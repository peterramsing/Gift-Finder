import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class EbayService {

  payloadToEbay: any; // TODO: better typing here!

  constructor(
    private http: HttpClient,
  ) {

  }

  searchEBayRequest(contextObject: object) {
    const url = environment.apiURL + 'ebay/';

    console.log('in search service', contextObject)

    return this.http
      .post(url, contextObject)
      .map((res: any) => {
        console.log('response', res)
        return res;
      });
  }
}
