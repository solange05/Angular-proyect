import { Component } from '@angular/core';
import { ClasesService } from '../../../core/services/clases.service';
import { Clase } from './models';
import { Observable } from 'rxjs';
import { CursosService } from '../../../core/services/cursos.service';
import { Curso } from '../cursos/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss'],
})
export class ClasesComponent {
  clases$: Observable<Clase[]>;
  cursos$: Observable<Curso[]>;

  cursoForm: FormGroup;

  constructor(
    private clasesService: ClasesService,
    private cursosService: CursosService,
    private formBuilder: FormBuilder
  ) {
    this.clases$ = this.clasesService.getClases();
    this.cursos$ = this.cursosService.getCursos();

    this.cursoForm = this.formBuilder.group({
      name: [],
      cantidadAlumnos: [],
      cursoId: [],
    });
  }

  onSubmit(): void {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
    } else {
      console.log(this.cursoForm.value);
      this.clases$ = this.clasesService.createClase(
        this.cursoForm.value
      );
    }
  }
}