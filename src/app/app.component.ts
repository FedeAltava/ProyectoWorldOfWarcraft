import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListaPersonajeComponent } from './lista-personajes/lista-personajes.component';
import { AgregarPersonajeComponent } from './agregar-personaje/agregar-personaje.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ListaPersonajeComponent,RouterLink,AgregarPersonajeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wowProyecto';
}
