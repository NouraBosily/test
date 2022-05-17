import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateneedsDetailsComponent } from './createneeds-details.component';

describe('CreateneedsDetailsComponent', () => {
  let component: CreateneedsDetailsComponent;
  let fixture: ComponentFixture<CreateneedsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateneedsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateneedsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
