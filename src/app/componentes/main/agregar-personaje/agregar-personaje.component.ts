import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personaje } from '../../../interface/personaje';
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
  subclasesDisponibles: string[] = [];


  constructor(private formBuilder: FormBuilder ,private characterService: CharacterService) {}

  ngOnInit(): void {
    const usuarioIdLogueado = 1; // Ejemplo: Obtén el ID del usuario logueado
    this.form = this.formBuilder.group({
      usuario_id: [usuarioIdLogueado, [Validators.required]], // ID del usuario
      nombre: ['', [Validators.required]],
      tipo_id: ['', [Validators.required]], // ID del tipo de personaje
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
    }
  }

  agregarPersonaje() {
    if (this.form.valid) {
      // Extrae los datos del formulario
      const nuevoPersonaje: Personaje = {
        usuario_id: this.form.value.usuario_id,
        tipo_id: this.form.value.tipo_id,
        clase: this.form.value.clase,
        subclase: this.form.value.subclase,
        descripcion: this.form.value.descripcion,
        nombre:this.form.value.nombre,
      };
  
      // Llama al servicio para crear el personaje
      this.characterService.createPersonaje(nuevoPersonaje).subscribe({
        next: (response) => {
          console.log('Personaje creado exitosamente:', response);
          alert('Personaje creado correctamente');
          // Reinicia el formulario después de crear el personaje
          this.form.reset();
        },
        error: (error) => {
          console.error('Error al crear el personaje:', error);
          alert('Ocurrió un error al crear el personaje. Por favor, inténtalo de nuevo.');
        },
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}