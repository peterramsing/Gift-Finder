import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class WatsonService {

  payloadToWatson: any; // TODO: better typing here!

  constructor(
    private http: HttpClient,
  ) {
    this.payloadToWatson = {
      input: {},
      context: null,
    };
  }

  sendGiftsRequest(message: string) {
    const url = environment.apiURL + 'gifts/';
    this.payloadToWatson.input.text = message;

    return this.http
      .post(url, this.payloadToWatson)
      .map((res: any) => {
        this.payloadToWatson.context = res.context;
        return res;
      });
  }
}
