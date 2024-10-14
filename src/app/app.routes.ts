import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './components/abm-alumnos/abm-alumnos.component';

export const routes: Routes = [
  { path: 'lista-alumnos', component: ListaAlumnosComponent },
  { path: 'abm-alumnos', component: AbmAlumnosComponent },
  { path: '', redirectTo: '/lista-alumnos', pathMatch: 'full' }, // Redirige a la lista de alumnos por defecto
  { path: '**', redirectTo: '/lista-alumnos' } // Redirige cualquier ruta no encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}