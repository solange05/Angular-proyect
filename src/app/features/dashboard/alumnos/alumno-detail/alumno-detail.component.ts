import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { Alumno } from '../models';

@Component({
  selector: 'app-alumno-detail',
  templateUrl: './alumno-detail.component.html',
  styleUrls: ['./alumno-detail.component.scss'],
})
export class AlumnoDetailComponent implements OnInit {
  idAlumno?: string;

  alumno?: Alumno;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService
  ) {
    console.log('LA RUTA ACTIVA ES: ', activatedRoute);
    this.idAlumno = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.alumnosService
      .getById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (alumno) => {
          this.alumno = alumno;
          this.isLoading = false;
        },
      });
  }
}