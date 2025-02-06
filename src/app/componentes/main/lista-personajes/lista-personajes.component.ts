import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CharacterService } from '../../../services/character-service.service';
import { Personaje } from '../../../interface/personaje';

@Component({
  selector: 'app-lista-personajes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css']
})
export class ListaPersonajesComponent implements OnInit {
  personajes: Personaje[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private characterService: CharacterService,private router: Router) {}

  ngOnInit(): void {
  
    this.characterService.getPersonajes().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.personajes = data;
        } else {
          this.errorMessage = 'La respuesta de la API no es válida.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener personajes:', err);
        this.errorMessage = 'Error al cargar los personajes. Por favor, intenta nuevamente.';
        this.isLoading = false;
      }
    });
  }
  // Método para eliminar un personaje
  deletePersonaje(id: number): void {
    if (id !== undefined && !isNaN(id)) {
      if (confirm('¿Estás seguro de que deseas eliminar este personaje?')) {
        this.characterService.deletePersonaje(id).subscribe({
          next: () => {
            // Eliminar el personaje de la lista local
            this.personajes = this.personajes.filter(personaje => personaje.id !== id);
            alert('Personaje eliminado correctamente.');
          },
          error: (err) => {
            console.error('Error al eliminar personaje:', err);
            alert(`No se pudo eliminar el personaje. Razón: ${err.message}`);
          }
        });
      }
    } else {
      console.error('ID del personaje no válido:', id);
    }
  }
  viewPersonaje(id: number): void {
    if (id !== undefined && !isNaN(id)) {
      window.location.href = `/personaje/${id}`;
    } else {
      console.error('ID del personaje no válido:', id);
    }
  }

  viewEditPersonaje(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/editar-personaje', id]);
    } else {
      console.error('ID del personaje no válido');
      alert('No se puede editar el personaje porque falta su ID.');
    }
  }
}