import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-personaje',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-personaje.component.html',
  styleUrls: ['./agregar-personaje.component.css']
})
export class AgregarPersonajeComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      nivel: ['', [Validators.required, Validators.min(1)]],
      clase: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      rama: ['', [Validators.required]]
    });
  }

  actualizarRamas(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      // Lógica para actualizar ramas
    }
  }

  agregarPersonaje() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}