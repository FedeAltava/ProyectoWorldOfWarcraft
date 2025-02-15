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
  form!: FormGroup; // Declara el FormGroup
  personaje: Personaje = {} as Personaje; // Inicializa como un objeto vacío
  ramasDisponibles: string[] = [];
  clases = [
    { nombre: "Guerrero", ramas: ["Armas", "Furia", "Protección"] },
    { nombre: "Paladín", ramas: ["Sagrado", "Protección", "Venganza"] },
    { nombre: "Cazador", ramas: ["Bestias", "Survival", "Tiro"] },
    { nombre: "Druida", ramas: ["Equilibrio", "Feral", "Guardia Estelar", "Restauración"] },
    { nombre: "Chamán", ramas: ["Elemental", "Mejoramiento", "Restauración"] },
    { nombre: "Mago", ramas: ["Arcano", "Fuego", "Escarcha"] },
    { nombre: "Sacerdote", ramas: ["Disciplina", "Sagrado", "Sombra"] },
    { nombre: "Pícaro", ramas: ["Asesinato", "Combate", "Sigilo"] },
    { nombre: "Monje", ramas: ["Tempestad", "Tejedor de Niebla", "Carrionero"] },
    { nombre: "Caballero de la Muerte", ramas: ["Hielo", "Pestilencia", "Sangre"] },
    { nombre: "Brujo", ramas: ["Destructiva", "Aflicción", "Demonología"] },
    { nombre: "Cazador de Demonios", ramas: ["Venganza", "Caos"] },
    { nombre: "Vengador", ramas: ["Defensa", "Ofensiva"] }, 
  ];

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    if (!id) {
      console.error('ID del personaje no válido');
      return;
    }

    // Inicializa un formulario vacío mientras se carga el personaje
    this.initializeEmptyForm();

    // Llama al servicio para obtener los detalles del personaje
    this.characterService.getPersonajeById(id).subscribe({
      next: (response) => {
        // Verifica si la respuesta es válida
        if (response && typeof response === 'object' && 'id' in response) {
          this.personaje = response; // Asigna los datos del personaje directamente
          this.initializeForm(); // Inicializa el formulario con los datos reales
        } else {
          console.error('Respuesta inválida del backend:', response);
          alert('No se pudo cargar el personaje');
        }
      },
      error: (err) => {
        console.error('Error al obtener personaje:', err);
        alert('Ocurrió un error al cargar el personaje');
      }
    });
  }

  // Método para inicializar un formulario vacío temporalmente
  initializeEmptyForm() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      clase: ['', Validators.required],
      nivel: [1, [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.required],
      subclase: [''] // Campo opcional
    });
  }

  // Método para inicializar el formulario con los datos del personaje
  initializeForm() {
    this.form = this.formBuilder.group({
      nombre: [this.personaje.nombre || '', [Validators.required]],
      clase: [this.personaje.clase || '', [Validators.required]],
      nivel: [this.personaje.nivel || 1, [Validators.required, Validators.min(1)]],
      descripcion: [this.personaje.descripcion || '', [Validators.required]],
      subclase: [this.personaje.subclase || '', []], // Campo opcional
    });

    // Inicializa las ramas disponibles según la clase seleccionada
    this.inicializarRamas(this.personaje.clase || '');
  }

  actualizarRamas(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.ramasDisponibles = this.clases.find(clase => clase.nombre === target.value)?.ramas || [];
      this.form.get('subclase')?.setValue(''); // Limpiar selección de rama
    }
  }

  inicializarRamas(clase: string) {
    this.ramasDisponibles = this.clases.find(claseObj => claseObj.nombre === clase)?.ramas || [];
    this.form.get('subclase')?.setValue(''); // Limpiar selección de rama
  }

  editarPersonaje() {
    if (this.form.valid && this.personaje.id !== undefined && this.personaje.id !== null) {
        const datosActualizados: Partial<Personaje> = {
            ...this.form.value,
            id: this.personaje.id,
        };

        this.characterService.updatePersonaje(this.personaje.id, datosActualizados).subscribe({
            next: (response) => {
                if (response && response.status === 'success') {
                    alert('Personaje actualizado correctamente');
                    this.router.navigate(['/personajes']); // Redirige a la lista de personajes
                } else {
                    alert('Ocurrió un error al actualizar el personaje: ' + (response?.message || 'Respuesta inválida'));
                }
            },
            error: (err) => {
                console.error('Error al actualizar personaje:', err);
                alert('Ocurrió un error al actualizar el personaje: ' + (err?.error?.message || 'Error desconocido'));
            },
        });
    } else {
        alert('Por favor, completa todos los campos obligatorios o revisa el ID del personaje.');
    }
}
}