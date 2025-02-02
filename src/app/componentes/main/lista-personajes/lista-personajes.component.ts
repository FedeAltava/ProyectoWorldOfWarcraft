import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../../../services/character-service.service';
import { Personaje } from '../../../interface/personaje';

@Component({
  selector: 'app-lista-personaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css']
})
export class ListaPersonajeComponent implements OnInit {

  personajes: Personaje[] = [];

  constructor(
    private characterService: CharacterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener la lista de personajes del usuario
    const usuarioId = 1; // ID del usuario logueado
    this.characterService.getPersonajes(usuarioId).subscribe({
      next: (data) => {
        this.personajes = data;
      },
      error: (err) => {
        console.error('Error al obtener personajes:', err);
      }
    });
  }

  // Navegar a la vista de detalles del personaje
  viewPersonaje(id: number): void {
    this.router.navigate(['/personaje', id]);
  }

  // Navegar a la vista de edición del personaje
  viewEditPersonaje(id: number): void {
    this.router.navigate(['/editar-personaje', id]);
  }
}