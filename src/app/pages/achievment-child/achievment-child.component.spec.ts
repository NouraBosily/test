import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievmentChildComponent } from './achievment-child.component';

describe('AchievmentChildComponent', () => {
  let component: AchievmentChildComponent;
  let fixture: ComponentFixture<AchievmentChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievmentChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievmentChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
