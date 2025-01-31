import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharacterService } from '../../../services/character-service.service';  // Asegúrate de importar el CharacterService


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
  personaje: { id: number, nombre: string, clase: string, nivel: number, descripcion: string, rama: string } = { id: -1, nombre: "", clase: "", nivel: 0, descripcion: "", rama: "" };
  
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
    private characterService: CharacterService,  // Usamos CharacterService
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtenemos el ID del parámetro de la URL
    this.characterService.getPersonajeById(id).subscribe(personaje => {
      this.personaje = personaje;
      this.initializeForm();
    });
  }

  // Inicializamos el formulario con los valores del personaje
  initializeForm() {
    this.form = this.formBuilder.group({
      nombre: [this.personaje.nombre, [Validators.required]],
      clase: [this.personaje.clase, [Validators.required]],
      nivel: [this.personaje.nivel, [Validators.required, Validators.min(1)]],
      descripcion: [this.personaje.descripcion, [Validators.required]],
      rama: [this.personaje.rama, [Validators.required]],
    });
    this.actualizarRamas(this.personaje.clase); // Establecer las ramas según la clase seleccionada
  }

  // Actualiza las ramas disponibles según la clase seleccionada
  actualizarRamas(claseSeleccionada: string) {
    const clase = this.clases.find(c => c.nombre === claseSeleccionada);
    this.ramasDisponibles = clase ? clase.ramas : [];
    this.form.get('rama')?.setValue(this.personaje.rama); // Establece la rama en el formulario
  }

  // Método para enviar los cambios de personaje
  editarPersonaje() {
    if (this.form.valid) {
      const { nombre, clase, nivel, descripcion, rama } = this.form.value;
      const id = this.personaje.id;

      this.characterService.updatePersonaje(id, { nombre, clase, nivel, descripcion, rama }).subscribe({
        next: () => {
          this.router.navigate(['/personajes']); // Redirige a la lista de personajes después de editar
        },
        error: (err) => {
          console.error('Error al actualizar el personaje:', err);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
