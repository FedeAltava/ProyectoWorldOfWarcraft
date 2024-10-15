import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { PersonajeService } from '../../services/personaje.service';
@Component({
  selector: 'app-detalles-personaje',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './detalles-personaje.component.html',
  styleUrl: './detalles-personaje.component.css'
})
export class DetallesPersonajeComponent {
personaje:any;

  constructor(private route: ActivatedRoute,private personajeService: PersonajeService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Obtener el id de la URL
    this.personaje = this.personajeService.getItemById(id); // Obtener el element
  }
}