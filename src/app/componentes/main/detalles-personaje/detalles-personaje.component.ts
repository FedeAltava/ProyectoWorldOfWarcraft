import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { RouterLink } from '@angular/router'; // Importar RouterLink
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../../services/character-service.service';
import { Personaje } from '../../../interface/personaje'; // Asegúrate de que esta interfaz exista

@Component({
  selector: 'app-detalles-personaje',
  standalone: true,
  imports: [CommonModule, RouterLink], // Incluir CommonModule y RouterLink aquí
  templateUrl: './detalles-personaje.component.html',
  styleUrls: ['./detalles-personaje.component.css']
})
export class DetallesPersonajeComponent implements OnInit {
  personaje!: Personaje; // Usar la interfaz Personaje para tipar la variable

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.characterService.getPersonajeById(id).subscribe({
      next: (personaje) => {
        this.personaje = personaje;
      },
      error: (err) => {
        console.error('Error al obtener el personaje:', err);
      }
    });
  }
}