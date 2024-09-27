import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarPersonajeComponent } from './borrar-personaje.component';

describe('BorrarPersonajeComponent', () => {
  let component: BorrarPersonajeComponent;
  let fixture: ComponentFixture<BorrarPersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrarPersonajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrarPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
