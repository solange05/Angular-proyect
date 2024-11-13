import { Injectable } from '@angular/core';
import { Alumno } from '../../features/dashboard/alumnos/models';
import { concatMap, Observable } from 'rxjs';
import { generateRandomString } from '../../shared/utils';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private baseURL = environment.apiBaseURL;

  constructor(private httpClient: HttpClient) {}

  getById(id: string): Observable<Alumno | undefined> {
    return this.httpClient.get<Alumno>(`${this.baseURL}/alumnos/${id}`);
  }

  getAlumnos(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(`${this.baseURL}/alumnos`);
  }

  createAlumno(data: Omit<Alumno, 'id'>): Observable<Alumno> {
    return this.httpClient.post<Alumno>(`${this.baseURL}/alumnos`, {
      ...data,
      role: 'USER',
      password: generateRandomString(8),
      token: generateRandomString(20),
      createdAt: new Date().toISOString(),
    });
  }

  removeAlumnoById(id: string): Observable<Alumno[]> {
    return this.httpClient
      .delete<Alumno>(`${this.baseURL}/alumnos/${id}`)
      .pipe(concatMap(() => this.getAlumnos()));
  }

  updateAlumnoById(id: string, update: Partial<Alumno>) {
    return this.httpClient
      .patch<Alumno>(`${this.baseURL}/alumnos/${id}`, update)
      .pipe(concatMap(() => this.getAlumnos()));
  }
}