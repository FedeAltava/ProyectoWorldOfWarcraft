import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../../services/character-service.service';
import { Personaje } from '../../../interface/personaje';

@Component({
  selector: 'app-editar-personaje',
  templateUrl: './editar-personaje.component.html',
  styleUrls: ['./editar-personaje.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EditarPersonajeComponent implements OnInit {
  form!: FormGroup;
  ramasDisponibles: string[] = [];
  personaje!: Personaje;
  clases = [
    { nombre: "Guerrero", ramas: ["Armas", "Furia", "Protección"] },
    { nombre: "Mago", ramas: ["Fuego", "Escarcha", "Arcano"] },
    { nombre: "Pícaro", ramas: ["Asesinato", "Combate", "Sutileza"] },
    // ... otras clases ...
  ];

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.characterService.getPersonajeById(id).subscribe({
      next: (personaje) => {
        this.personaje = personaje;
        this.initializeForm();
        this.inicializarRamas(this.personaje.clase); // Inicializar ramas
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
      rama: [this.personaje.rama, [Validators.required]]
    });
  }

  actualizarRamas(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.ramasDisponibles = this.clases.find(clase => clase.nombre === target.value)?.ramas || [];
      this.form.get('rama')?.setValue(''); // Limpiar selección de rama
    }
  }

  inicializarRamas(clase: string) {
    this.ramasDisponibles = this.clases.find(c => c.nombre === clase)?.ramas || [];
    this.form.get('rama')?.setValue('');
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