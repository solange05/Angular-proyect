import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos.component';
import { AlumnoDetailComponent } from './alumno-detail/alumno-detail.component';

const routes: Routes = [
  /** /dashboard/alumnos */
  {
    path: '',
    component: AlumnosComponent,
  },
  {
    path: ':id/detail',
    component: AlumnoDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosRoutingModule {}