import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class PersonajeService {
  private personajes: { nombre: string, clase: string, nivel: number }[] = [
    { nombre: 'Arthas', clase: 'Caballero de la Muerte', nivel: 80 },
    { nombre: 'Jaina', clase: 'Mago', nivel: 100 },
    { nombre: 'Thrall', clase: 'Chamán', nivel: 90 }
  ];

  constructor() { }

  // Obtener la lista completa de personajes
  getPersonajes() {
    return this.personajes;
  }

  // Agregar un nuevo personaje
  agregarPersonaje(personaje: { nombre: string, clase: string, nivel: number }) {
    this.personajes.push(personaje);
  }

  // Borrar un personaje por su nombre
  borrarPersonaje(nombre: string) {
    this.personajes = this.personajes.filter(p => p.nombre !== nombre);
  }
}
