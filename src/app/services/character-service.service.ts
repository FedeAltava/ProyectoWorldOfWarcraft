import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Personaje } from '../interface/personaje';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private baseUrl = 'https://c74f4156107e.ngrok.app/api/federico/personajes.php?table='; // Base URL

  constructor(private http: HttpClient) {}

  // Método para obtener los personajes de un usuario
  getPersonajes(usuario_id: number): Observable<Personaje[]> {
    return this.http.get<any>(`${this.baseUrl}personajes&usuario_id=${usuario_id}`).pipe(
      map((response: any) => {
        // Si la respuesta contiene un array en una propiedad específica (por ejemplo, "data")
        if (response && Array.isArray(response.data)) {
          return response.data;
        }
        // Si la respuesta ya es un array
        if (Array.isArray(response)) {
          return response;
        }
        // Si no cumple con ninguna de las condiciones anteriores, devuelve un array vacío
        console.error('La respuesta no tiene la estructura esperada:', response);
        return [];
      })
    );
  }

  // Método para crear un personaje
  createPersonaje(personaje: Personaje): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}personajes`, personaje, { headers });
  }

  // Método para obtener un personaje específico por ID
  getPersonajeById(id: number): Observable<Personaje> {
    return this.http.get<Personaje>(`${this.baseUrl}personajes&id=${id}`);
  }

  // Método para actualizar un personaje
  updatePersonaje(id: number, data: Personaje): Observable<any> {
    return this.http.put(`${this.baseUrl}personajes&id=${id}`, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  // Método para eliminar un personaje
  deletePersonaje(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}personajes&id=${id}`);
  }
}