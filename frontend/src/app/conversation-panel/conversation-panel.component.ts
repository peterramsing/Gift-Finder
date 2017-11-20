import { Component, OnInit } from '@angular/core';

import { WatsonService } from './../core/watson.service';

@Component({
  selector: 'app-conversation-panel',
  templateUrl: './conversation-panel.component.html',
  styleUrls: ['./conversation-panel.component.css']
})
export class ConversationPanelComponent implements OnInit {
  messageValue: string;
  messageLog: Array<any>;

  constructor(
    private WS: WatsonService,
  ) {
    this.messageLog = [];
    this.messageValue = '';
    this.submitMessage(); // Initial call on load to start the conversation
  }

  ngOnInit() {
  }


  submitMessage() {
    this.messageLog.push({
      'text': this.messageValue,
      'author': 'user',
    });
    this.WS.sendGiftsRequest(this.messageValue)
      .subscribe((data: any) => {
        this.messageLog.push({
          'text': data.output.text,
          'author': 'bot',
        });
      });
    this.messageValue = null; // Resets the text field.
  }
}
