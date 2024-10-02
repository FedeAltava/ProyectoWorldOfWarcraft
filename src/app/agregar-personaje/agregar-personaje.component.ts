import { Component } from '@angular/core';
import { PersonajeService } from '../personaje.service'; 
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

  agregarPersonaje(nombre: string, clase: string, nivel: string){
    console.log("hola mundo");
    var nivel_number:number = Number(nivel);
    this.personajeService.agregarPersonaje({nombre, clase, nivel: nivel_number});
  }
}


