import { Routes } from '@angular/router';
import { ListaPersonajeComponent } from './componentes/main/lista-personajes/lista-personajes.component';
import { AgregarPersonajeComponent } from './componentes/main/agregar-personaje/agregar-personaje.component';
import { DetallesPersonajeComponent } from './componentes/main/detalles-personaje/detalles-personaje.component';
import { EditarPersonajeComponent } from './componentes/main/editar-personaje/editar-personaje.component';
import { InicioSesionComponent } from './componentes/main/inicio-sesion/inicio-sesion.component';

export const routes: Routes = [
    { path: '/', component: InicioSesionComponent }, //Ruta inicial a inicio de sesión 
    { path: 'list', component: ListaPersonajeComponent }, // Ruta para listar personajes
    { path: 'personaje/:id', component: DetallesPersonajeComponent }, // Ruta para detalles de un personaje específico
    { path: 'add', component: AgregarPersonajeComponent }, // Ruta para agregar un nuevo personaje
    { path: 'edit/:id', component: EditarPersonajeComponent }, // Ruta para editar un personaje
    { path: '', redirectTo: '/list', pathMatch: 'full' }, // Ruta por defecto que redirige a la lista
    { path: '**', redirectTo: '/list' } // Redirige cualquier ruta no válida a la lista
];

