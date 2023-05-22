import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCuentaComponent } from './mi-cuenta.component';

describe('MiCuentaComponent', () => {
  let component: MiCuentaComponent;
  let fixture: ComponentFixture<MiCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
