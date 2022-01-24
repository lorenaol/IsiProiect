import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestAsTransportatorComponent } from './view-request-as-transportator.component';

describe('ViewRequestAsTransportatorComponent', () => {
  let component: ViewRequestAsTransportatorComponent;
  let fixture: ComponentFixture<ViewRequestAsTransportatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRequestAsTransportatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRequestAsTransportatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
