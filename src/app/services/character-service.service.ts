import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Personaje } from '../interface/personaje';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private baseUrl = 'https://c74f4156107e.ngrok.app/api/federico/personajes.php?table='; // Base URL

  constructor(private http: HttpClient) {}


// Método para obtener los personajes de un usuario (siempre el usuario con ID 1)
getPersonajes(): Observable<Personaje[]> {
  const usuario_id = 1; // ID del usuario fijo

  return this.http.get<any>(`${this.baseUrl}personajes&usuario_id=${usuario_id}`).pipe(
    map((response: { data: any[] }) => {
      if (response && response.data && Array.isArray(response.data)) {
        return response.data.map((item: any) => ({
          id: item.id,
          usuario_id: item.usuario_id,
          tipo_id: item.tipo_id,
          clase: item.clase,
          subclase: item.subclase || '',
          descripcion: item.descripcion || '',
          fecha_creacion: item.fecha_creacion,
          nombre: item.nombre || '',
          nivel: item.nivel || 1,
          rama: item.rama || ''
        }));
      } else {
        console.error('La respuesta no tiene la estructura esperada:', response);
        return [];
      }
    }),
    catchError((error) => {
      console.error('Error al obtener personajes:', error);
      return throwError(() => new Error('Error al obtener personajes'));
    })
  );
}



  // Método para crear un personaje
  createPersonaje(personaje: Personaje): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Convierte el objeto personaje a JSON antes de enviarlo
    return this.http.post(`${this.baseUrl}personajes`, personaje, { headers }).pipe(  // Cambié las comillas simples por comillas invertidas
      catchError((error: HttpErrorResponse) => {
        console.error('Error al crear personaje:', error);
        return throwError(() => new Error('Error al crear personaje'));
      })
    );
  }

  // Método para obtener un personaje específico por ID
  getPersonajeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}personajes&id=${id}`).pipe(  // Cambié las comillas simples por comillas invertidas
      map((response: any) => {
        if (response && response.data) {
          return response.data; // Devuelve los datos del personaje
        } else {
          console.error('Respuesta inválida de la API:', response);
          throw new Error('No se pudo obtener el personaje');
        }
      }),
      catchError((error) => {
        console.error('Error al obtener el personaje:', error);
        throw error;
      })
    );
  }

  // Método para actualizar un personaje
  updatePersonaje(id: number, data: Personaje): Observable<any> {
    return this.http.put(`${this.baseUrl}personajes&id=${id}`, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });  // Cambié las comillas simples por comillas invertidas
  }

  // Método para eliminar un personaje
  deletePersonaje(id: number): Observable<any> {
    const usuario_id = 1; // ID del usuario fijo (puedes cambiarlo dinámicamente si es necesario)
    return this.http.delete(`${this.baseUrl}personajes&id=${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al eliminar personaje:', error);
        let errorMessage = 'Error desconocido';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          try {
            const body = error.error || {};
            errorMessage = body.message || body.error || 'Error del servidor';
          } catch (e) {
            errorMessage = 'Respuesta del servidor no válida';
          }
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
