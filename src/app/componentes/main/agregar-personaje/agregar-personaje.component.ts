import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharacterService } from '../../../services/character-service.service';

@Component({
  selector: 'app-agregar-personaje',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-personaje.component.html',
  styleUrls: ['./agregar-personaje.component.css']
})
export class AgregarPersonajeComponent implements OnInit {
  form!: FormGroup;
  clases = [
    { nombre: "Guerrero", subclases: ["Armas", "Furia", "Protección"] },
    { nombre: "Mago", subclases: ["Fuego", "Escarcha", "Arcano"] },
    { nombre: "Pícaro", subclases: ["Asesinato", "Combate", "Sutileza"] },
    { nombre: "Cazador", subclases: ["Bestias", "Puntería", "Supervivencia"] },
    { nombre: "Chamán", subclases: ["Elemental", "Mejora", "Restauración"] },
    { nombre: "Hechicero", subclases: ["Brujería", "Runas", "Oscuridad"] },
    { nombre: "Druida", subclases: ["Equilibrio", "Feral", "Restauración"] },
    { nombre: "Caballero de la Muerte", subclases: ["Sangre", "Escarcha", "Profano"] },
    { nombre: "Monje", subclases: ["Maestro cervecero", "Tejedor de niebla", "Viajero del viento"] },
    { nombre: "Paladín", subclases: ["Sagrado", "Protección", "Reprensión"] },
    { nombre: "Brujo", subclases: ["Aflicción", "Demonología", "Destrucción"] },
    { nombre: "Cazador de Demonios", subclases: ["Devastación", "Venganza"] }
  ];
  subclasesDisponibles: string[] = []; // Almacena las subclases disponibles

  constructor(
    private formBuilder: FormBuilder,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      nivel: ['', [Validators.required, Validators.min(1)]],
      tipo_id: ['', [Validators.required]], // Campo para el tipo_id
      clase: ['', [Validators.required]],
      subclase: ['', []], // Subclase no es obligatoria
      descripcion: ['', [Validators.required]]
    });
  }

  actualizarSubclases(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      const claseSeleccionada = this.clases.find(clase => clase.nombre === target.value);
      this.subclasesDisponibles = claseSeleccionada?.subclases || [];
      this.form.get('subclase')?.setValue(''); // Limpiar selección de subclase
    } else {
      this.subclasesDisponibles = []; // Si no hay clase seleccionada, vacía las subclases
    }
  }

  agregarPersonaje() {
    if (this.form.valid) {
      const nuevoPersonaje = this.form.value;
      this.characterService.createPersonaje(nuevoPersonaje).subscribe({
        next: () => {
          alert('Personaje agregado exitosamente');
          this.form.reset(); // Reinicia el formulario
        },
        error: (err) => {
          console.error('Error al agregar personaje:', err);
          alert('Ocurrió un error al agregar el personaje.');
        }
      });
    }
  }
}