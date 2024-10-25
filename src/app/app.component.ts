import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./componentes/main/header/header.component";
import { ListaPersonajeComponent } from './componentes/main/lista-personajes/lista-personajes.component';
import { AgregarPersonajeComponent } from './componentes/main/agregar-personaje/agregar-personaje.component';
import { MainComponent } from "./componentes/main/main.component";
import { FooterComponent } from './componentes/main/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaPersonajeComponent, RouterLink, AgregarPersonajeComponent, HeaderComponent, MainComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wowProyecto';
}
