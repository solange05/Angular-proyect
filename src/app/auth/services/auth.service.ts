import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { LoginFormValue, User } from 'src/app/core/models/user';
import { AppState } from 'src/app/store';
import { RemoveAuthUser, SetAuthUser } from 'src/app/store/auth/auth.actions';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) { }

  getUser(): Observable<User | null> {
    return this.store.select(selectAuthUser);
  }

  setAuthUser(user: User): void {
    this.store.dispatch(SetAuthUser({payload: user}));
  }

  login(formValue: LoginFormValue): void {
    this.httpClient.get<User[]>(
      `${environment.apiBaseUrl}/users`,
      {
        params: {
          ...formValue
        }
      }
    ).subscribe({
      next: (users) => {
        const userAuth = users[0];
        if(userAuth) {
          localStorage.setItem('token', userAuth.token)
          this.setAuthUser(userAuth)
          this.router.navigate(['sistema','inicio'])
        }else{
          Swal.fire('', 'Usuario y/o contraseña incorrectos', 'error')
        }
      }
    })
  }

  logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(RemoveAuthUser());
    this.router.navigate(['auth']);
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<User[]>(
      `${environment.apiBaseUrl}/users?token=${token}`,
    )
    .pipe(
      map((users) => {
        const userAuth = users[0];
        if(userAuth){
          this.setAuthUser(userAuth)
        }
        return !!userAuth;
      }),
      catchError((error) => {
        Swal.fire('', 'Ocurrió un error al obtener la información. No es posible cargar el sitio', 'error');
        return throwError(() => error);
      })
    )
  }
}
