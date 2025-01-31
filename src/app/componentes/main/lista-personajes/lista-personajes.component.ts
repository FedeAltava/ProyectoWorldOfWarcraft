import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../../../services/character-service.service';


@Component({
  selector: 'app-lista-personaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css']
})
export class ListaPersonajeComponent implements OnInit {

  personajes: { id: number, nombre: string, clase: string, nivel: number, descripcion: string, rama: string }[] = [];

  constructor(private characterService: CharacterService, private router: Router) { }

  ngOnInit(): void {
    // Llamada al servicio para obtener los personajes de un usuario específicos
    const usuarioId = 1;  
    this.characterService.getPersonajes(usuarioId).subscribe({
      next: (data) => {
        this.personajes = data;
      },
      error: (err) => {
        console.error('Error al obtener personajes:', err);
      }
    });
  }

  borrarPersonaje(id: number): void {
    // Llamada al servicio para eliminar el personaje por ID
    this.characterService.deletePersonaje(id).subscribe({
      next: () => {
        // Si la eliminación es exitosa, actualizamos la lista de personajes
        this.personajes = this.personajes.filter(personaje => personaje.id !== id);
      },
      error: (err) => {
        console.error('Error al eliminar el personaje:', err);
      }
    });
  }

  viewPersonaje(id: number): void {
    // Navegar a la vista de detalles del personaje
    this.router.navigate(['/personaje', id]);
  }

  viewEditPersonaje(id: number): void {
    // Navegar a la vista de edición del personaje
    this.router.navigate(['/edit', id]);
  }
}
