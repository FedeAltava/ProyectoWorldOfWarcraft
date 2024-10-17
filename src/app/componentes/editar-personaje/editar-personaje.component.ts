import { Component, OnInit } from '@angular/core';
import { PersonajeService } from '../../services/personaje.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-personaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editar-personaje.component.html',
  styleUrls: ['./editar-personaje.component.css']
})
export class EditarPersonajeComponent implements OnInit {
  
  personaje: { id: number, nombre: string, clase: string, nivel: number, descripcion: string, rama: string } | undefined;
  clases: string[] = ['Guerrero', 'Mago', 'Arquero']; // Lista de clases, puedes adaptarla

  constructor(
    private personajeService: PersonajeService, 
    private router: Router,
    private route: ActivatedRoute // Inyectamos ActivatedRoute para obtener el ID
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtenemos el ID de los parámetros de la ruta
    this.personaje = this.personajeService.getItemById(id); // Cargamos el personaje a editar
  }

  editarPersonaje(nombre: string, clase: string, nivel: string, descripcion: string, rama: string) {
    if (this.personaje) { // Verificamos que el personaje esté definido
      const nivel_number = Number(nivel); // Convierte el string a número
      this.personajeService.editarPersonaje(this.personaje.id, nombre, clase, nivel_number, descripcion, rama); // Pasamos el id
      this.router.navigate(['/list']); // Redirige a la lista de personajes después de editar
    }
  }
}


