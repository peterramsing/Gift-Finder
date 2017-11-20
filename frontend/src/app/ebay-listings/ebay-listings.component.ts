import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ebay-listings',
  templateUrl: './ebay-listings.component.html',
  styleUrls: ['./ebay-listings.component.css']
})
export class EbayListingsComponent implements OnInit {

  constructor() {

  }

  @Input()
  listings = [];

  ngOnInit() {
  }

}
