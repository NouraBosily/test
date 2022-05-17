import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateneedsComponent } from './createneeds.component';

describe('CreateneedsComponent', () => {
  let component: CreateneedsComponent;
  let fixture: ComponentFixture<CreateneedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateneedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateneedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
