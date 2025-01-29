import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

  ramasDisponibles: string[] = [];

  constructor(
    private characterService: CharacterService,  // Usamos CharacterService
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Inicializamos el formulario con validaciones
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      nivel: ['', [Validators.required, Validators.min(1)]],
      clase: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      rama: ['', [Validators.required]],
    });
  }

  // Método para actualizar las ramas disponibles según la clase seleccionada
  actualizarRamas(claseSeleccionada: string) {
    const clase = this.clases.find(c => c.nombre === claseSeleccionada);
    this.ramasDisponibles = clase ? clase.ramas : [];
    this.form.get('rama')?.setValue(''); // Reinicia la rama seleccionada si cambia la clase
  }

  // Método para enviar el formulario de agregar personaje
  agregarPersonaje() {
    if (this.form.valid) {
      // Obtenemos los valores del formulario
      const { nombre, clase, nivel, descripcion, rama } = this.form.value;

      // Llamamos al servicio para agregar el personaje
      this.characterService.createPersonaje({
        nombre,
        clase,
        nivel,
        descripcion,
        rama
      }).subscribe({
        next: (data) => {
          console.log('Personaje creado con éxito:', data);
          // Redirigimos a la lista de personajes o a donde se desee después de agregar
          this.router.navigate(['/personajes']);
        },
        error: (err) => {
          console.error('Error al crear personaje:', err);
        }
      });
    } else {
      // Si el formulario no es válido, muestra una advertencia o realiza alguna acción
      console.log('Formulario no válido');
    }
  }
}
