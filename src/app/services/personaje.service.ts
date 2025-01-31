/* import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class PersonajeService {
  private personajes: { id: number, nombre: string, clase: string, nivel: number, descripcion: string, rama: string }[] = [];
  private storageKey = 'personajes';

  constructor(private router: Router) {
    // Verifica si hay personajes guardados en el localStorage. Si los encuentra, los carga en la propiedad 'personajes'.
    if (this.isLocalStorageAvailable()) {
      const personajesGuardados = localStorage.getItem(this.storageKey);
      if (personajesGuardados) {
        this.personajes = JSON.parse(personajesGuardados);
      }
    }
  }

  getItemById(id: number): any {
    return this.personajes.find(personaje => personaje.id === id);
  }
  
  // Obtener la lista completa de personajes
  getPersonajes() {
    return this.personajes;
  }

  // Agregar un nuevo personaje
  agregarPersonaje(nombre: string, clase: string, nivel: number, descripcion: string, rama: string) {
    const newId = this.personajes.length > 0 
      ? Math.max(...this.personajes.map(personaje => personaje.id)) + 1 
      : 1;

    const personaje = { id: newId, nombre, clase, nivel, descripcion, rama };
    this.personajes.push(personaje);

    // Guarda el vector actualizado en localStorage
    this.saveToLocalStorage();
    this.router.navigate(['/list']); 
  }

  // Borrar un personaje por su índice
  borrarPersonaje(index: number) {
    if (index > -1 && index < this.personajes.length) {
      this.personajes.splice(index, 1);
      // Guarda el vector actualizado en localStorage
      this.saveToLocalStorage();
    }
  }

// Editar un personaje existente
editarPersonaje(id: number, nombre: string, clase: string, nivel: number, descripcion: string, rama: string) {
  const indice = this.personajes.findIndex(personaje => personaje.id === id);
  if (indice !== -1) {
    // Actualiza el personaje con los nuevos valores
    this.personajes[indice] = {
      ...this.personajes[indice],
      nombre,
      clase,
      nivel,
      descripcion,
      rama
    };
    // Guarda el arreglo actualizado en localStorage
    this.saveToLocalStorage();
  }
}



  // Método para guardar la lista de personajes en localStorage como un string JSON.
  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.personajes)); // Convierte el arreglo a JSON y lo guarda
  }

  // Método que verifica si localStorage está disponible en el entorno actual
  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    } catch (e) {
      return false;
    }
  }
}

 */