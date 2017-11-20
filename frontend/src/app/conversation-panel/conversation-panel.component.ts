import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EbayService } from './../core/ebay.service';
import { WatsonService } from './../core/watson.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-conversation-panel',
  templateUrl: './conversation-panel.component.html',
  styleUrls: ['./conversation-panel.component.css']
})
export class ConversationPanelComponent implements OnInit, AfterViewInit {
  convoListElement: any;
  eBayListings: Array<any>;
  messageValue: string;
  messageLog: Array<any>;
  resultsPresent: Boolean;

  constructor(
    private _ES: EbayService,
    private _WS: WatsonService,
    private http: HttpClient,
  ) {
    this.eBayListings = [];
    this.messageLog = [];
    this.messageValue = '';
    this.resultsPresent = false;
    this.submitMessage(); // Initial call on load to start the conversation
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.convoListElement = document.querySelector('#js-ConversationList');
  }

  _scrollTop() {
    if (this.convoListElement) {
      // Using a timeout to ensure the render is complete... 😳
      setTimeout(() => {
        this.convoListElement.scrollTop = this.convoListElement.scrollHeight;
      }, 500);
    }
  }

  _searchEBay(context) {
    this._ES.searchEBayRequest(context)
      .subscribe((data: any) => {
        this.eBayListings = data;
        this.resultsPresent = true;
      });
  }

  _clearInput() {
    this.messageValue = null; // Resets the text field.
  }

  submitMessage() {
    this._scrollTop();

    if (this.messageValue) {
      this.messageLog.push({
        'text': this.messageValue,
        'author': 'user',
      });
      const isEmail = this.messageValue
        .match('.*[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*.*');
      if (isEmail && this.resultsPresent) {
        this._sendEmail(this.messageValue, this.eBayListings);
        this._clearInput();
        return;
      }
    }

    this._WS.sendGiftsRequest(this.messageValue)
      .subscribe((data: any) => {
        this.messageLog.push({
          'text': data.output.text,
          'author': 'bot',
        });
        this._scrollTop();

        if (data.context.interests) {
          this._searchEBay(data.context);
        }
      });

    this._clearInput();
  }


  // TODO: Make this a service of its own
  _sendEmail(emailAddress, eBayListings) {
    const url = environment.apiURL + 'email/';
    const eBayURLS = [];
    for (let i = 0; i < eBayListings.length; i++) {
      eBayURLS.push({
        'link': eBayListings[i].viewItemURL,
        'title': eBayListings[i].title,
      });
    }
    const emailPayload = {
      'emailAddress': emailAddress,
      'links': eBayURLS,
    };

    return this.http.post(url, emailPayload).toPromise()
      .then(() => {
        // TODO: Actually do some validation here!
        this.messageLog.push({
          'text': 'Email sent! You\'re welcome to keep finding gifts if you\'d like.',
          'author': 'bot',
        });
      });
  }
}
