import { Component, OnInit, AfterViewInit } from '@angular/core';

import { EbayService } from './../core/ebay.service';
import { WatsonService } from './../core/watson.service';

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
    this.convoListElement = document.querySelector("#js-ConversationList")
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
    console.log('searching ebay', context)
    this._ES.searchEBayRequest(context)
      .subscribe((data:any) => {
        this.eBayListings = data;
        this.resultsPresent = true;
        // TODO: Submit another Watson Request to trigger emailing these
        // when implementing the email/text service
      });
  }

  submitMessage() {
    this._scrollTop();


    if (this.messageValue) {
      this.messageLog.push({
        'text': this.messageValue,
        'author': 'user',
      });
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

    this.messageValue = null; // Resets the text field.
  }
}
