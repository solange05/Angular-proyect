import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './components/abm-alumnos/abm-alumnos.component';

const routes: Routes = [
  { path: 'lista-alumnos', component: ListaAlumnosComponent },
  { path: 'abm-alumnos', component: AbmAlumnosComponent },
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule {}