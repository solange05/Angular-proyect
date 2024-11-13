import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';

import { SharedModule } from '../../../shared/shared.module';
import { AlumnoDialogComponent } from './alumno-dialog/alumno-dialog.component';
import { AlumnoDetailComponent } from './alumno-detail/alumno-detail.component';

@NgModule({
  declarations: [AlumnosComponent, AlumnoDialogComponent, AlumnoDetailComponent],
  imports: [CommonModule, AlumnosRoutingModule, SharedModule],
  exports: [AlumnosComponent],
})
export class AlumnosModule {}