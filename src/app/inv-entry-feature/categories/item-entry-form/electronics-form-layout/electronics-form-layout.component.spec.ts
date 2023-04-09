import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicsFormLayoutComponent } from './electronics-form-layout.component';

describe('ElectronicsFormLayoutComponent', () => {
  let component: ElectronicsFormLayoutComponent;
  let fixture: ComponentFixture<ElectronicsFormLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectronicsFormLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectronicsFormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
