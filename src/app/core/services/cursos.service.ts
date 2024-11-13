import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Curso } from '../../features/dashboard/cursos/models';
import { generateRandomString } from '../../shared/utils';

let CURSOS_DB: Curso[] = [
  {
    id: generateRandomString(4),
    name: 'Mañana',
    createdAt: new Date(),
  },
  {
    id: generateRandomString(4),
    name: 'Tarde',
    createdAt: new Date(),
  },
  {
    id: generateRandomString(4),
    name: 'Noche',
    createdAt: new Date(),
  },
];

@Injectable({ providedIn: 'root' })
export class CursosService {
  getCursos(): Observable<Curso[]> {
    return of([...CURSOS_DB]);
  }

  createCurso(
    curso: Omit<Curso, 'id' | 'createdAt'>
  ): Observable<Curso> {
    const cursoCreado = {
      ...curso,
      id: generateRandomString(4),
      createdAt: new Date(),
    };
    CURSOS_DB.push(cursoCreado);
    return of(cursoCreado);
  }

  editCurso(id: string, curso: Partial<Curso>): Observable<Curso> {
    const cursoAEditar = CURSOS_DB.find((cur) => cur.id === id);

    if (!cursoAEditar) {
      return throwError(() => new Error('No se encontró el curso'));
    }

    CURSOS_DB = CURSOS_DB.map((cur) =>
      cur.id === id ? { ...cursoAEditar, ...curso } : cur
    );

    return of(cursoAEditar);
  }
}