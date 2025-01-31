import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl = 'https://c74f4156107e.ngrok.app/api/federico/personajes.php?table='; // Base URL

  constructor(private http: HttpClient) { }
  personaje
  // Método para crear un personaje
  createPersonaje(personaje: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}personajes`, personaje, { headers });
  }

  // Método para obtener los personajes de un usuario
  getPersonajes(usuario_id: number): Observable<personaje> {
    return this.http.get(`${this.baseUrl}personajes&usuario_id=${usuario_id}`);
  }

  // Método para obtener un personaje específico por ID
  getPersonajeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}personajes&id=${id}`);
  }

  // Método para actualizar un personaje
  updatePersonaje(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}personajes&id=${id}`, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  // Método para eliminar un personaje
  deletePersonaje(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}personajes&id=${id}`);
  }
}

