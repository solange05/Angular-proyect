import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAlumnosComponent } from '../../components/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from '../../components/abm-alumnos/abm-alumnos.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MaterialModule } from '../../material/material.module'; 

@NgModule({
  declarations: [
    ListaAlumnosComponent,
    AbmAlumnosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MaterialModule 
  ],
  exports: [
    ListaAlumnosComponent,
    AbmAlumnosComponent 
  ]
})
export class AlumnosModule { }