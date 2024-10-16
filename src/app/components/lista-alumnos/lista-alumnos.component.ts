import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {
  displayedColumns: string[] = ['nombreCompleto', 'curso', 'acciones'];
  
  alumnos: Alumno[] = [];

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.alumnos = this.alumnoService.getAlumnos(); // Obtener la lista de alumnos
  }

  deleteAlumno(id: number) {
    this.alumnoService.deleteAlumno(id); // Eliminar el alumno del servicio
    this.alumnos = this.alumnoService.getAlumnos(); // Actualizar la lista
  }
}