import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakrsComponent } from './makrs.component';

describe('MakrsComponent', () => {
  let component: MakrsComponent;
  let fixture: ComponentFixture<MakrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
