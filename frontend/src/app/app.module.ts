import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';

import { ConversationPanelComponent } from './conversation-panel/conversation-panel.component';
import { EbayListingsComponent } from './ebay-listings/ebay-listings.component';

@NgModule({
  declarations: [
    AppComponent,
    ConversationPanelComponent,
    EbayListingsComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
