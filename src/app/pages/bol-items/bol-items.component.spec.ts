import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolItemsComponent } from './bol-items.component';

describe('BolItemsComponent', () => {
  let component: BolItemsComponent;
  let fixture: ComponentFixture<BolItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
