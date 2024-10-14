import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {
  displayedColumns: string[] = ['nombreCompleto', 'curso'];
  alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', curso: 'Matemáticas' },
    { id: 2, nombre: 'Ana', apellido: 'Gómez', curso: 'Historia' },
    // Agregar mas
  ];

  constructor() {}

  ngOnInit(): void {}
}