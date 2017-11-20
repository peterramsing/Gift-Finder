import { Component, OnInit } from '@angular/core';

import { EbayService } from './../core/ebay.service';
import { WatsonService } from './../core/watson.service';

@Component({
  selector: 'app-conversation-panel',
  templateUrl: './conversation-panel.component.html',
  styleUrls: ['./conversation-panel.component.css']
})
export class ConversationPanelComponent implements OnInit {
  eBayListings: Array<any>;
  messageValue: string;
  messageLog: Array<any>;

  constructor(
    private _ES: EbayService,
    private _WS: WatsonService,
  ) {
    this.eBayListings = [];
    this.messageLog = [];
    this.messageValue = '';
    this.submitMessage(); // Initial call on load to start the conversation
  }

  ngOnInit() {
  }

  _searchEBay(context) {
    console.log('searching ebay', context)
    this._ES.searchEBayRequest(context)
      .subscribe((data:any) => {
        this.eBayListings = data
        // TODO: Submit another Watson Request to trigger emailing these
        // when implementing the email/text service
      });
  }

  submitMessage() {
    this.messageLog.push({
      'text': this.messageValue,
      'author': 'user',
    });
    this._WS.sendGiftsRequest(this.messageValue)
      .subscribe((data: any) => {
        this.messageLog.push({
          'text': data.output.text,
          'author': 'bot',
        });

        if (data.context.interests) {
          this._searchEBay(data.context);
        }
      });

    this.messageValue = null; // Resets the text field.
  }
}
