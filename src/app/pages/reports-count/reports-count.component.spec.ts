import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsCountComponent } from './reports-count.component';

describe('ReportsCountComponent', () => {
  let component: ReportsCountComponent;
  let fixture: ComponentFixture<ReportsCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
