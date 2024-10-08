import { Routes } from '@angular/router';
import { ListaPersonajeComponent } from './lista-personajes/lista-personajes.component';
import { AgregarPersonajeComponent } from './agregar-personaje/agregar-personaje.component';
import { DetallesPersonajeComponent } from './detalles-personaje/detalles-personaje.component';

export const routes: Routes = [
    { path: 'list', component: ListaPersonajeComponent },  // Ruta para listar los Digimons
    {path: 'personaje/:id', component: DetallesPersonajeComponent},
    { path: 'add', component: AgregarPersonajeComponent },   // Ruta para agregar un nuevo Digimon
    { path: '', redirectTo: '/list', pathMatch: 'full' }, // Ruta por defecto
    { path: '**', redirectTo: '/list' }  // Redirige cualquier ruta no válida
];
