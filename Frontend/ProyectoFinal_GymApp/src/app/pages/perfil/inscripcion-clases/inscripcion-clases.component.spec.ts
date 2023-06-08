import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionClasesComponent } from './inscripcion-clases.component';

describe('InscripcionClasesComponent', () => {
  let component: InscripcionClasesComponent;
  let fixture: ComponentFixture<InscripcionClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscripcionClasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
