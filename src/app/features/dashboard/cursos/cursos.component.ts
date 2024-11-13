import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../../core/services/cursos.service';
import { Curso } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
  cursoForm: FormGroup;
  isEditing?: Curso;

  constructor(
    private cursosService: CursosService,
    private fb: FormBuilder
  ) {
    this.cursoForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursosService.getCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        this.isEditing = undefined;
      },
    });
  }

  onCreate(): void {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
    } else {
      this.cursosService.createCurso(this.cursoForm.value).subscribe({
        next: (cursoCreated) => {
          this.cursos = [...this.cursos, cursoCreated];
          this.cursoForm.reset();
          this.cursoForm.get('name')?.markAsUntouched();
        },
      });
    }
  }

  onEdit(curso: Curso): void {
    this.isEditing = curso;
    this.cursoForm.patchValue(curso);
  }

  handleSubmit(): void {
    if (this.isEditing) {
      this.cursosService
        .editCurso(this.isEditing.id, this.cursoForm.value)
        .subscribe({
          next: () => {
            this.loadCursos();
            this.cursoForm.reset();
            this.cursoForm.get('name')?.markAsUntouched();
          },
        });
    } else {
      this.onCreate();
    }
  }
}