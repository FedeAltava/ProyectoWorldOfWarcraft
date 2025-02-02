import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharacterService } from '../../../services/character-service.service';
import { Personaje } from '../../../interface/personaje';

@Component({
  selector: 'app-agregar-personaje',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-personaje.component.html',
  styleUrls: ['./agregar-personaje.component.css']
})
export class AgregarPersonajeComponent implements OnInit {

  form!: FormGroup;
  ramasDisponibles: string[] = [];

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
    private characterService: CharacterService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      nivel: ['', [Validators.required, Validators.min(1)]],
      clase: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      rama: ['', [Validators.required]],
    });
  }

  actualizarRamas(claseSeleccionada: string) {
    const clase = this.clases.find(c => c.nombre === claseSeleccionada);
    this.ramasDisponibles = clase ? clase.ramas : [];
    this.form.get('rama')?.setValue('');
  }

  agregarPersonaje() {
    if (this.form.valid) {
      const nuevoPersonaje: Personaje = this.form.value;
      this.characterService.createPersonaje(nuevoPersonaje).subscribe({
        next: () => {
          this.router.navigate(['/personajes']);
        },
        error: (err) => {
          console.error('Error al crear personaje:', err);
        }
      });
    }
  }
}