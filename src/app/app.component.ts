import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./componentes/header/header.component";
import { ListaPersonajeComponent } from './componentes/lista-personajes/lista-personajes.component';
import { AgregarPersonajeComponent } from './componentes/agregar-personaje/agregar-personaje.component';
import { MainComponent } from "./componentes/main/main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaPersonajeComponent, RouterLink, AgregarPersonajeComponent, HeaderComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wowProyecto';
}
