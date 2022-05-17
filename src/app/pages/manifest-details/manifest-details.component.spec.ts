import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestDetailsComponent } from './manifest-details.component';

describe('ManifestDetailsComponent', () => {
  let component: ManifestDetailsComponent;
  let fixture: ComponentFixture<ManifestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManifestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
