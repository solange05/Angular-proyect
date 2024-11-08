import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassFormComponent } from './class-form/class-form.component';



@NgModule({
  declarations: [
    ClassListComponent,
    ClassFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClassesModule { }
