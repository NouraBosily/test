import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeviceChildComponent } from './create-device-child.component';

describe('CreateDeviceChildComponent', () => {
  let component: CreateDeviceChildComponent;
  let fixture: ComponentFixture<CreateDeviceChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeviceChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeviceChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
