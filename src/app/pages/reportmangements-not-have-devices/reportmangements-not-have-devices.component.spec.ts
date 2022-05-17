import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportmangementsNotHaveDevicesComponent } from './reportmangements-not-have-devices.component';

describe('ReportmangementsNotHaveDevicesComponent', () => {
  let component: ReportmangementsNotHaveDevicesComponent;
  let fixture: ComponentFixture<ReportmangementsNotHaveDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportmangementsNotHaveDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportmangementsNotHaveDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
