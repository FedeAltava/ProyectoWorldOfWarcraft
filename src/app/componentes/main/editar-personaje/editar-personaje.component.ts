import { Component, OnInit } from '@angular/core';
import { PersonajeService } from '../../../services/personaje.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Server } from 'http';

@Component({
  selector: 'app-editar-personaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editar-personaje.component.html',
  styleUrls: ['./editar-personaje.component.css']
})
export class EditarPersonajeComponent implements OnInit {
    
  ramasDisponibles: string[] = [];
  nombre: string = '';
  clase: string = '';
  nivel: number | null = null;
  descripcion : string ='';
  rama: string = '';
  
  personaje: { id: number, nombre: string, clase: string, nivel: number, descripcion: string, rama: string } = {id: -1, nombre: "string", clase: "string", nivel: 2, descripcion: "string", rama: "string" }
  clases = [
    { nombre: "Guerrero", ramas: ["Armas", "Furia", "Protección"] },
    { nombre: "Mago", ramas: ["Fuego", "Escarcha", "Arcano"] },
    { nombre: "Pícaro", ramas: ["Asesinato", "Combate", "Sutileza"] },
    { nombre: "Cazador", ramas: ["Bestias", "Puntería", "Supervivencia"] },
    { nombre: "Chamán", ramas: ["Elemental", "Mejora", "Restauración"] },
    { nombre: "Hechicero", ramas: ["Brujería", "Runas", "Oscuridad"] },
    { nombre: "Druida", ramas: ["Equilibrio", "Feral", "Restauración"] },
    { nombre: "Caballero de la Muerte", ramas: ["Sangre", "Escarcha", "Profano"] },
    { nombre: "Monje", ramas: ["Maestro cervecero", "Tejedor de niebla", "Viajero del viento"] },
    { nombre: "Paladín", ramas: ["Sagrado", "Protección", "Reprensión"] },
    { nombre: "Brujo", ramas: ["Aflicción", "Demonología", "Destrucción"] },
    { nombre: "Cazador de Demonios", ramas: ["Devastación", "Venganza"] },
  ];
  constructor(
    private personajeService: PersonajeService, 
    private router: Router,
    private route: ActivatedRoute // Inyectamos ActivatedRoute para obtener el ID
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtenemos el ID de los parámetros de la ruta
    this.personaje = this.personajeService.getItemById(id); // Cargamos el personaje a editar
  }


  actualizarRamas(claseSeleccionada: string) {
    const clase = this.clases.find(c => c.nombre === claseSeleccionada);
    this.ramasDisponibles = clase ? clase.ramas : [];
    this.rama = ''; // Reinicia la rama seleccionada si cambia la clase.
  }

  editarPersonaje(nombre: string, clase: string, nivel: string, descripcion: string, rama: string) {
    const id = this.personaje.id;
      const nivel_number = Number(nivel); // Convierte el string a número
      this.personajeService.editarPersonaje(id, nombre, clase, nivel_number, descripcion, rama); // Pasamos el id
      this.router.navigate(['/list']); // Redirige a la lista de personajes después de editar
    
  }
}

