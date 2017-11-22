import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatsonService } from './watson.service';
import { EbayService } from './ebay.service';
import { AnalyticsService } from './analytics.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [WatsonService, EbayService, AnalyticsService]
})
export class CoreModule { }
