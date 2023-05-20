import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPlanComponent } from './crear-plan.component';

describe('CrearPlanComponent', () => {
  let component: CrearPlanComponent;
  let fixture: ComponentFixture<CrearPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
