import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatsonService } from './watson.service';
import { EbayService } from './ebay.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [WatsonService, EbayService]
})
export class CoreModule { }
