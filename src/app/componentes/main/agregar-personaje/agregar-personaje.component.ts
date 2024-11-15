import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajeService } from '../../../services/personaje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-personaje',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './agregar-personaje.component.html',
  styleUrls: ['./agregar-personaje.component.css']
})
export class AgregarPersonajeComponent {
  nombre: string = '';
  clase: string = '';
  nivel: number | null = null;
  descripcion : string ='';
  rama: string = '';

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
  constructor(private personajeService: PersonajeService,private router: Router)  { }

  ramasDisponibles: string[] = [];
  
  actualizarRamas(claseSeleccionada: string) {
    const clase = this.clases.find(c => c.nombre === claseSeleccionada);
    this.ramasDisponibles = clase ? clase.ramas : [];
    this.rama = ''; // Reinicia la rama seleccionada si cambia la clase.
  }
  agregarPersonaje(nombre: string, clase: string, nivel: string, descripcion:string, rama:string){
    var nivel_number:number = Number(nivel);
    this.personajeService.agregarPersonaje(nombre, clase, nivel_number, descripcion,rama);
    
  }
}


