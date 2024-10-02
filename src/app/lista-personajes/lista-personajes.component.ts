import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PersonajeService } from '../personaje.service'; // Importar el servicio

@Component({
  selector: 'app-lista-personaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css']
})
export class ListaPersonajeComponent implements OnInit {
  personajes: { nombre: string, clase: string, nivel: number }[] = [];

  constructor(private personajeService: PersonajeService) { }
  
  ngOnInit(): void {
    this.personajes = this.personajeService.getPersonajes(); // Obtener personajes del servicio
  }
  borrarPersonaje(index: number){
    this.personajeService.borrarPersonaje(index);
  }
  
}


