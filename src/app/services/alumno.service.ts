import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private alumnos: Alumno[] = [];

  constructor() {}

  // Alta de alumno
  addAlumno(alumno: Alumno) {
    this.alumnos.push(alumno);
  }

  // Get de todos los alumnos
  getAlumnos(): Alumno[] {
    return this.alumnos;
  }

  // Modificar alumno
  updateAlumno(id: number, updatedAlumno: Alumno) {
    const index = this.alumnos.findIndex(alumno => alumno.id === id);
    if (index !== -1) {
      this.alumnos[index] = updatedAlumno;
    }
  }

  // Eliminar alumno
  deleteAlumno(id: number) {
    this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
  }
}