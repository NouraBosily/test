import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesMangsComponent } from './devices-mangs.component';

describe('DevicesMangsComponent', () => {
  let component: DevicesMangsComponent;
  let fixture: ComponentFixture<DevicesMangsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesMangsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesMangsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
