// src/app/components/abm-alumnos/abm-alumnos.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.css']
})
export class AbmAlumnosComponent implements OnInit {
  
  alumnoForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.alumnoForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      curso: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const nuevoAlumno: Alumno = {
      id: Math.random(),
      ...this.alumnoForm.value,
    };
    
    console.log('Alumno agregado:', nuevoAlumno);
    // logica para guardar el nuevo alumno en un service
    
    this.alumnoForm.reset(); // Resetear el formulario después de enviar
  }
}