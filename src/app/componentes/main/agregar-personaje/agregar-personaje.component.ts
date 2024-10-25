import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajeService } from '../../../services/personaje.service';

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
  descripcion : string ='';
  rama: string = '';

  clases = ["Guerrero","Mago","Pícaro","Cazador","Chamán","Hechicero","Druida","Caballero de la Muerte","Monje","Paladín","Brujo","Cazador de Demonios"];
  constructor(private personajeService: PersonajeService) { }

  agregarPersonaje(nombre: string, clase: string, nivel: string, descripcion:string, rama:string){
    var nivel_number:number = Number(nivel);
    this.personajeService.agregarPersonaje(nombre, clase, nivel_number, descripcion,rama);
  }
}


