import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../../services/character-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles-personaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles-personaje.component.html',
  styleUrls: ['./detalles-personaje.component.css']
})
export class DetallesPersonajeComponent implements OnInit {
  personaje: any = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Obtiene el ID de la URL
    if (isNaN(id)) {
      console.error('ID del personaje no válido');
      this.isLoading = false;
      return;
    }

    this.characterService.getPersonajeById(id).subscribe({
      next: (data) => {
        this.personaje = data;
        this.isLoading = false; // Finaliza la carga
      },
      error: (err) => {
        console.error('Error al obtener el personaje:', err);
        this.isLoading = false; // Finaliza la carga en caso de error
      }
    });
  }
}