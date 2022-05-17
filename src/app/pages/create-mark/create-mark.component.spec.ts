import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMarkComponent } from './create-mark.component';

describe('CreateMarkComponent', () => {
  let component: CreateMarkComponent;
  let fixture: ComponentFixture<CreateMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
