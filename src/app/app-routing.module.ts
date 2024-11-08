import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './components/abm-alumnos/abm-alumnos.component';
import { ListaClasesComponent } from './components/lista-clases/lista-clases.component'; 
import { AbmClasesComponent } from './components/abm-clases/abm-clases.component'; 
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component'; 
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/lista-alumnos', pathMatch: 'full' }, // Redirige a la lista de alumnos por defecto
  { path: 'lista-alumnos', component: ListaAlumnosComponent },
  { path: 'abm-alumnos', component: AbmAlumnosComponent },
  { path: 'lista-clases', component: ListaClasesComponent }, 
  { path: 'abm-clases', component: AbmClasesComponent },     
  { path: 'lista-cursos', component: ListaCursosComponent },   
  { path: 'abm-cursos', component: AbmCursosComponent },       
  // agregar mas rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}