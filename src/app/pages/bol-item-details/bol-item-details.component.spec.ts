import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolItemDetailsComponent } from './bol-item-details.component';

describe('BolItemDetailsComponent', () => {
  let component: BolItemDetailsComponent;
  let fixture: ComponentFixture<BolItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
