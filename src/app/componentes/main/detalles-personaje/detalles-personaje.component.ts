import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../../../services/character-service.service';  // Cambié a CharacterService

@Component({
  selector: 'app-detalles-personaje',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalles-personaje.component.html',
  styleUrls: ['./detalles-personaje.component.css']
})
export class DetallesPersonajeComponent implements OnInit {
  personaje: any;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService  // Cambié a CharacterService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Obtener el id de la URL
    this.characterService.getPersonajeById(id).subscribe({
      next: (personaje) => {
        this.personaje = personaje; // Almacena el personaje en la variable
      },
      error: (err) => {
        console.error('Error al obtener el personaje:', err);
      }
    });
  }
}
