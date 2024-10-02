import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class PersonajeService {
  private personajes: { nombre: string, clase: string, nivel: number }[] = [
   
  ];
  private storageKey = 'personajes';
  constructor() { 

          // Verifica si hay Digimon guardados en el localStorage. Si los encuentra, los carga en la propiedad 'digimons'.
          if (this.isLocalStorageAvailable()) {
            const personajesGuardados = localStorage.getItem(this.storageKey);
            if (personajesGuardados) {
              this.personajes = JSON.parse(personajesGuardados);
            }
          }
  }

  // Obtener la lista completa de personajes
  getPersonajes() {
    return this.personajes;
  }

  // Agregar un nuevo personaje
  agregarPersonaje(personaje: { nombre: string, clase: string, nivel: number }) {
    this.personajes.push(personaje);
    // Guarda el vector actualizado en localStorage
    this.saveToLocalStorage();
  }

  // Borrar un personaje por su nombre
  borrarPersonaje(index: number) {
    this.personajes.splice(index, 1);
    // Guarda el vector actualizado en localStorage
    this.saveToLocalStorage();
  }
    // Método para guardar la lista de Digimon en localStorage como un string JSON.
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
