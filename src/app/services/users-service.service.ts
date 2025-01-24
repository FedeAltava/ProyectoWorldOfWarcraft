import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://192.168.0.111:80/api/federico/personajes.php?table='; // Base URL

  constructor(private http: HttpClient) { }

  // Método para crear un nuevo usuario
  createUsuario(usuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}usuarios`, usuario, { headers });
  }

  // Método para eliminar un usuario
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}usuarios&id=${id}`);
  }

  // Método para actualizar un usuario
  updateUsuario(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}usuarios&id=${id}`, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  // Método para obtener los datos de usuarios
  getUsuarios(nombre?: string): Observable<any> {
    let url = `${this.baseUrl}usuarios`;
    if (nombre) {
      url += `&nombre=${nombre}`; // Si se pasa un nombre, se agrega a la URL
    }
    return this.http.get(url);
  }

  // Método para obtener los personajes de un usuario
  getPersonajes(usuario_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}personajes&usuario_id=${usuario_id}`);
  }

  // Método para agregar un favorito
  addFavorito(usuario_id: number, personaje_id: number): Observable<any> {
    const body = { usuario_id, personaje_id };
    return this.http.post(`${this.baseUrl}favoritos`, body, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  // Método para eliminar un favorito
  deleteFavorito(usuario_id: number, personaje_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}favoritos&usuario_id=${usuario_id}&personaje_id=${personaje_id}`);
  }

  // Método para obtener los personajes borrados de un usuario
  getPersonajesBorrados(usuario_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}personajes_borrados&usuario_id=${usuario_id}`);
  }
}
