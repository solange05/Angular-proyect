import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Curso } from '../models'; 

@Component({
  selector: 'app-cursos-table', 
  templateUrl: './cursos-table.component.html', 
  styleUrls: ['./cursos-table.component.scss'], 
})
export class CursosTableComponent {
  @Input()
  cursos: Curso[] = []; 

  @Output()
  edit = new EventEmitter<Curso>();

  displayedColumns = ['id', 'name', 'createdAt', 'actions'];
}