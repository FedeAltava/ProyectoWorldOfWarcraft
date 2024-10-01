import { Component } from '@angular/core';
import { PersonajeService } from '../personaje.service'; // Importar el servicio
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-personaje',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './agregar-personaje.component.html',
  styleUrls: ['./agregar-personaje.component.css']
})
export class AgregarPersonajeComponent {
  nombre: string = '';
  clase: string = '';
  nivel: number | null = null;

  clases = ["Guerrero","Mago","Pícaro","Cazador","Chamán","Hechicero","Druida","Caballero de la Muerte","Monje","Paladín","Brujo","Cazador de Demonios"];
  

  constructor(private personajeService: PersonajeService) { }

  onSubmit() {
    if (this.nombre && this.clase && this.nivel !== null) {
      const nuevoPersonaje = { nombre: this.nombre, clase: this.clase, nivel: this.nivel };
      this.personajeService.agregarPersonaje(nuevoPersonaje); // Usar el servicio para agregar el personaje
      console.log('Personaje agregado:', nuevoPersonaje);
    }
  }
}


