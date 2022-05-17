import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMangsComponent } from './edit-mangs.component';

describe('EditMangsComponent', () => {
  let component: EditMangsComponent;
  let fixture: ComponentFixture<EditMangsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMangsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMangsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
