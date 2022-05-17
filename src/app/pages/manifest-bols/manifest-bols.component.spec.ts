import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestBolsComponent } from './manifest-bols.component';

describe('ManifestBolsComponent', () => {
  let component: ManifestBolsComponent;
  let fixture: ComponentFixture<ManifestBolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManifestBolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestBolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
