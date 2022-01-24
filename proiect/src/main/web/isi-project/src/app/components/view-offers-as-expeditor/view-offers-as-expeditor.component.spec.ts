import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOffersAsExpeditorComponent } from './view-offers-as-expeditor.component';

describe('ViewOffersAsExpeditorComponent', () => {
  let component: ViewOffersAsExpeditorComponent;
  let fixture: ComponentFixture<ViewOffersAsExpeditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOffersAsExpeditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOffersAsExpeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
