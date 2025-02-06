import { Routes } from '@angular/router';
import { ListaPersonajesComponent } from './componentes/main/lista-personajes/lista-personajes.component';
import { AgregarPersonajeComponent } from './componentes/main/agregar-personaje/agregar-personaje.component';
import { DetallesPersonajeComponent } from './componentes/main/detalles-personaje/detalles-personaje.component';
import { EditarPersonajeComponent } from './componentes/main/editar-personaje/editar-personaje.component';
import { InicioSesionComponent } from './componentes/main/inicio-sesion/inicio-sesion.component';

export const routes: Routes = [
    
    { path: 'list', component: ListaPersonajesComponent }, // Ruta para listar personajes
    { path: 'personajes/:id', component: DetallesPersonajeComponent }, // Ruta para detalles de un personaje específico
    { path: 'add', component: AgregarPersonajeComponent }, // Ruta para agregar un nuevo personaje
    { path: 'edit/:id', component: EditarPersonajeComponent }, // Ruta para editar un personaje
    { path: '', redirectTo: '/list', pathMatch: 'full' }, // Ruta por defecto que redirige a la lista
    { path: '**', redirectTo: '/list' } // Redirige cualquier ruta no válida a la lista
];

