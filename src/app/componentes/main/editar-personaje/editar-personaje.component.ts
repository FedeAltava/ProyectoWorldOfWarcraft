import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharacterService } from '../../../services/character-service.service';
import { Personaje } from '../../../interface/personaje';

@Component({
  selector: 'app-editar-personaje',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-personaje.component.html',
  styleUrls: ['./editar-personaje.component.css']
})
export class EditarPersonajeComponent implements OnInit {

  form!: FormGroup;
  ramasDisponibles: string[] = [];
  personaje!: Personaje;

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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.characterService.getPersonajeById(id).subscribe({
      next: (personaje) => {
        this.personaje = personaje;
        this.initializeForm();
      },
      error: (err) => {
        console.error('Error al obtener personaje:', err);
      }
    });
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      nombre: [this.personaje.nombre, [Validators.required]],
      clase: [this.personaje.clase, [Validators.required]],
      nivel: [this.personaje.nivel, [Validators.required, Validators.min(1)]],
      descripcion: [this.personaje.descripcion, [Validators.required]],
      rama: [this.personaje.rama, [Validators.required]],
    });
    this.actualizarRamas(this.personaje.clase);
  }

  actualizarRamas(claseSeleccionada: string) {
    const clase = this.clases.find(c => c.nombre === claseSeleccionada);
    this.ramasDisponibles = clase ? clase.ramas : [];
  }

  editarPersonaje() {
    if (this.form.valid) {
      const datosActualizados: Personaje = this.form.value;
      this.characterService.updatePersonaje(this.personaje.id, datosActualizados).subscribe({
        next: () => {
          this.router.navigate(['/personajes']);
        },
        error: (err) => {
          console.error('Error al actualizar personaje:', err);
        }
      });
    }
  }
}