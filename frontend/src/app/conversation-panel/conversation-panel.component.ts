import { Component, OnInit } from '@angular/core';

import { WatsonService } from './../core/watson.service';

@Component({
  selector: 'app-conversation-panel',
  templateUrl: './conversation-panel.component.html',
  styleUrls: ['./conversation-panel.component.css']
})
export class ConversationPanelComponent implements OnInit {

  constructor(
    private WatsonService: WatsonService,
  ) { }

  ngOnInit() {
  }

}
