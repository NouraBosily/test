import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderneedsComponent } from './orderneeds.component';

describe('OrderneedsComponent', () => {
  let component: OrderneedsComponent;
  let fixture: ComponentFixture<OrderneedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderneedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderneedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
