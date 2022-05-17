import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsNeedsComponent } from './reports-needs.component';

describe('ReportsNeedsComponent', () => {
  let component: ReportsNeedsComponent;
  let fixture: ComponentFixture<ReportsNeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsNeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
