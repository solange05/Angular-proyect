import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthData } from '../../features/auth/models';
import { Alumno } from '../../features/dashboard/alumnos/models';
import { MockProvider } from 'ng-mocks';
import { NavigationExtras, Router } from '@angular/router';

const mockAlumno: Alumno = {
  id: 'dsds',
  firstName: 'Mock',
  lastName: 'Mock',
  email: 'mockuser@mail.com',
  password: '123456',
  createdAt: new Date(),
  token: 'FJDSFNSDvmfSKDdmsddaamds',
  role: ''
};
const mockAuthData: AuthData = {
  email: 'mockuser@mail.com',
  password: '123456',
};

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        MockProvider(Router, {
          navigate: (commands: any[], extras?: NavigationExtras) => {
            return new Promise((res) => res(true));
          },
        }),
      ],
    });

    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('El servicio debe ser definido', () => {
    expect(service).toBeTruthy();
  });

  it('Debe realizarse el login y establecer el token en localStorage', (done) => {
    service.login(mockAuthData).subscribe({
      next: (alumno) => {
        expect(alumno).toEqual(mockAlumno);
        expect(localStorage.getItem('token')).toEqual(mockAlumno.token);
        done();
      },
    });
    const mockReq = httpController.expectOne({
      url: `${service['baseURL']}/alumnos?email=${mockAuthData.email}&password=${mockAuthData.password}`,
      method: 'GET',
    });
    mockReq.flush([mockAlumno]);
  });

  it('Debe retornar un error al realizar un login inválido', (done) => {
    service.login(mockAuthData).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err['message']).toBe('Los datos son inválidos');
        done();
      },
    });

    const mockReq = httpController.expectOne({
      url: `${service['baseURL']}/alumnos?email=${mockAuthData.email}&password=${mockAuthData.password}`,
      method: 'GET',
    });
    mockReq.flush([]);
  });

  it('Logout debe remover el token de localStorage, desestablecer el usuario autenticado y redirigir a /auth/login', (done) => {
    const spyOnNavigate = spyOn(router, 'navigate');

    service.login(mockAuthData).subscribe();
    const mockReq = httpController.expectOne({
      url: `${service['baseURL']}/alumnos?email=${mockAuthData.email}&password=${mockAuthData.password}`,
      method: 'GET',
    });
    mockReq.flush([mockAlumno]);

    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    service.authUser$.subscribe({
      next: (alumno) => {
        expect(alumno).toBeNull();
        done();
      },
    });

    expect(spyOnNavigate).toHaveBeenCalledOnceWith(['auth', 'login']);
  });
});