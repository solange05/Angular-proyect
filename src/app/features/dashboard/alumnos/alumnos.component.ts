import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlumnoDialogComponent } from './alumno-dialog/alumno-dialog.component';
import { Alumno } from './models';
import { AlumnosService } from '../../../core/services/alumnos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  dataSource: Alumno[] = [];

  isLoading = false;

  authUser$: Observable<Alumno | null>;

  constructor(
    private matDialog: MatDialog,
    private alumnosService: AlumnosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.authUser$;
  }

  ngOnInit(): void {
    this.loadAlumnos();
  }

  loadAlumnos(): void {
    this.isLoading = true;
    this.alumnosService.getAlumnos().subscribe({
      next: (alumnos) => {
        this.dataSource = alumnos;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onDelete(id: string) {
    if (confirm('¿Está seguro?')) {
      this.isLoading = true;
      this.alumnosService.removeAlumnoById(id).subscribe({
        next: (alumnos) => {
          this.dataSource = alumnos;
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], {
      relativeTo: this.activatedRoute,
    });
  }

  openModal(editingAlumno?: Alumno): void {
    this.matDialog
      .open(AlumnoDialogComponent, {
        data: {
          editingAlumno,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingAlumno) {
              this.handleUpdate(editingAlumno.id, result);
            } else {
              this.alumnosService
                .createAlumno(result)
                .subscribe({ next: () => this.loadAlumnos() });
            }
          }
        },
      });
  }

  handleUpdate(id: string, update: Alumno): void {
    this.isLoading = true;
    this.alumnosService.updateAlumnoById(id, update).subscribe({
      next: (alumnos) => {
        this.dataSource = alumnos;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}