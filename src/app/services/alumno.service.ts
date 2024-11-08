import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../core/models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private alumnos: Alumno[] = [];
  private alumnosSubject: BehaviorSubject<Alumno[]> = new BehaviorSubject<Alumno[]>(this.alumnos);

  constructor() {}

  // Alta de alumno
  addAlumno(alumno: Alumno) {
    this.alumnos.push(alumno);
    this.alumnosSubject.next(this.alumnos); // Actualiza el observable
  }

  // Get de todos los alumnos como observable
  getAlumnos(): Observable<Alumno[]> {
    return this.alumnosSubject.asObservable(); // Devuelve el observable
  }

  // Modificar alumno
  updateAlumno(id: number, updatedAlumno: Alumno) {
    const index = this.alumnos.findIndex(alumno => alumno.id === id);
    if (index !== -1) {
      this.alumnos[index] = updatedAlumno;
      this.alumnosSubject.next(this.alumnos); // Actualiza el observable
    }
  }

  // Eliminar alumno
  deleteAlumno(id: number) {
    this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
    this.alumnosSubject.next(this.alumnos); // Actualiza el observable
  }
}