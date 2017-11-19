import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatsonService } from './watson.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [WatsonService]
})
export class CoreModule { }
