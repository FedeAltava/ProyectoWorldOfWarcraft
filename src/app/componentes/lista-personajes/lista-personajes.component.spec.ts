import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPersonajeComponent } from './lista-personajes.component';

describe('ListaPersonajesComponent', () => {
  let component: ListaPersonajeComponent;
  let fixture: ComponentFixture<ListaPersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPersonajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
