import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDevicesWithDateComponent } from './report-devices-with-date.component';

describe('ReportDevicesWithDateComponent', () => {
  let component: ReportDevicesWithDateComponent;
  let fixture: ComponentFixture<ReportDevicesWithDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDevicesWithDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDevicesWithDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
