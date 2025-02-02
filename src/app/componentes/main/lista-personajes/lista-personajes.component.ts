import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../../../services/character-service.service';
import { Personaje } from '../../../interface/personaje';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-personaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css']
})
export class ListaPersonajeComponent implements OnInit {
  personajes: Personaje[] = []; // Inicializamos como un array vacío

  constructor(
    private characterService: CharacterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioId = 1; // ID del usuario logueado
    this.characterService.getPersonajes(usuarioId).subscribe({
      next: (data: Personaje[]) => {
        this.personajes = data; // Asignamos los datos directamente
      },
      error: (err) => {
        console.error('Error al obtener personajes:', err);
        this.personajes = []; // Inicializamos como un array vacío en caso de error
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