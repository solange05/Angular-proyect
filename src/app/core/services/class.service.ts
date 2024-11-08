import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Class } from '../models/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private classes: Class[] = [
    { id: 1, name: 'Matematicas' },
    { id: 2, name: 'Historia' },
    { id: 3, name: 'Musica' }
  ];

  getClasses(): Observable<Class[]> {
    return of(this.classes);
  }

  addClass(newClass: Class): void {
    this.classes.push(newClass);
  }

  editClass(updatedClass: Class): void {
    const index = this.classes.findIndex(c => c.id === updatedClass.id);
    if (index !== -1) {
      this.classes[index] = updatedClass; // Actualiza la clase existente
    }
  }

  deleteClass(classId: number): void {
    this.classes = this.classes.filter(c => c.id !== classId); // Filtra la clase que se quiere eliminar
  }
}