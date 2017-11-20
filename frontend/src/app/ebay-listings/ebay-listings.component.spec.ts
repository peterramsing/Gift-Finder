import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbayListingsComponent } from './ebay-listings.component';

describe('EbayListingsComponent', () => {
  let component: EbayListingsComponent;
  let fixture: ComponentFixture<EbayListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbayListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbayListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
