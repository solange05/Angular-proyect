import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from '../../core/models/alumno.model';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.css']
})
export class AbmAlumnosComponent implements OnInit {
  
  alumnoForm: FormGroup;
  
  constructor(private fb: FormBuilder, private alumnoService: AlumnoService) {
    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      curso: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const nuevoAlumno: Alumno = {
      id: Math.random(),
      ...this.alumnoForm.value,
    };
    
    console.log('Alumno agregado:', nuevoAlumno);
    this.alumnoService.addAlumno(nuevoAlumno); // Guardar en el servicio
    
    this.alumnoForm.reset(); // Resetear el formulario después de enviar
  }
}