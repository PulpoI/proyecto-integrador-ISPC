import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesTiendaComponent } from './planesTienda.component';

describe('PlanesTiendaComponent', () => {
  let component: PlanesTiendaComponent;
  let fixture: ComponentFixture<PlanesTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesTiendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
