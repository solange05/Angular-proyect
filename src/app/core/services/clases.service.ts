import { Injectable } from '@angular/core';
import { Clase } from '../../features/dashboard/clases/models';
import { generateRandomString } from '../../shared/utils';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export let MY_DATABASE: Clase[] = [
  {
    id: generateRandomString(4),
    name: 'PC Gamer',
    CantidadDeAlumnos: 26,
    cursoId: 'fSDv3d',
  },
  {
    id: generateRandomString(4),
    name: 'PS5',
    CantidadDeAlumnos: 48,
    cursoId: 'VCSsd3',
  },
];

@Injectable({ providedIn: 'root' })
export class ClasesService {
  constructor(private httpClient: HttpClient) {}

  getClases(): Observable<Clase[]> {
    return this.httpClient.get<Clase[]>(`${environment.apiBaseURL}/clases`);
    // return of([...MY_DATABASE]);
  }

  deleteById(id: string): Observable<Clase[]> {
    MY_DATABASE = MY_DATABASE.filter((c) => c.id !== id);
    return this.getClases();
  }

  createClase(data: Omit<Clase, 'id'>): Observable<Clase[]> {
    MY_DATABASE.push({ ...data, id: generateRandomString(4) });
    return this.getClases();
  }
}