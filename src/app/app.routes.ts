import { Routes } from '@angular/router';
import { ListaPersonajeComponent } from './componentes/lista-personajes/lista-personajes.component';
import { AgregarPersonajeComponent } from './componentes/agregar-personaje/agregar-personaje.component';
import { DetallesPersonajeComponent } from './componentes/detalles-personaje/detalles-personaje.component';

export const routes: Routes = [
    { path: 'list', component: ListaPersonajeComponent },  // Ruta para listar 
    {path: 'personaje/:id', component: DetallesPersonajeComponent},
    { path: 'add', component: AgregarPersonajeComponent },   // Ruta para agregar 
    { path: '', redirectTo: '/list', pathMatch: 'full' }, // Ruta por defecto
    { path: '**', redirectTo: '/list' }  // Redirige cualquier ruta no válida
];
