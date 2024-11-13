import { Injectable } from '@angular/core';
import { AuthData } from '../../features/auth/models';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { Alumno } from '../../features/dashboard/alumnos/models';
import { generateRandomString } from '../../shared/utils';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/actions/auth.actions';
import { selectAutheticatedUser } from '../../store/selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authUser$: Observable<Alumno | null>;
  private baseURL = environment.apiBaseURL;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store
  ) {
    this.authUser$ = this.store.select(selectAutheticatedUser);
  }

  private handleAuthentication(alumnos: Alumno[]): Alumno | null {
    if (!!alumnos[0]) {
      this.store.dispatch(AuthActions.setAuthenticatedUser({ user: alumnos[0] }));
      localStorage.setItem('token', alumnos[0].token);
      return alumnos[0];
    } else {
      return null;
    }
  }

  login(data: AuthData): Observable<Alumno> {
    return this.httpClient
      .get<Alumno[]>(
        `${this.baseURL}/alumnos?email=${data.email}&password=${data.password}`
      )
      .pipe(
        map((alumnos) => {
          const alumno = this.handleAuthentication(alumnos);
          if (alumno) {
            return alumno;
          } else {
            throw new Error('Los datos son inválidos');
          }
        })
      );
  }

  logout() {
    this.store.dispatch(AuthActions.unsetAuthenticatedUser());
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }

  verifyToken(): Observable<boolean> {
    return this.httpClient
      .get<Alumno[]>(
        `${this.baseURL}/alumnos?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((alumnos) => {
          const alumno = this.handleAuthentication(alumnos);
          return !!alumno;
        })
      );
  }
}