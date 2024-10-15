import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajeService } from '../../services/personaje.service';
@Component({
  selector: 'app-lista-personaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css']
})

export class ListaPersonajeComponent implements OnInit {
  
  personajes: { id: number,nombre: string, clase: string, nivel: number,descripcion:string,rama:string }[] = [];

  
  constructor(private personajeService: PersonajeService, private router: Router) { }

  ngOnInit(): void {
    this.personajes = this.personajeService.getPersonajes(); // Obtener personajes del servicio
  }
  borrarPersonaje(index: number){
    this.personajeService.borrarPersonaje(index);
  }
  viewPersonaje(id: number){
    this.router.navigate(['/personaje', id]);
  }
  
}


