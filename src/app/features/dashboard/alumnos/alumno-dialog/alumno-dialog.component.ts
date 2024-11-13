import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { Alumno } from '../models';

interface AlumnoDialogData {
  editingAlumno?: Alumno;
}

@Component({
  selector: 'app-alumno-dialog',
  templateUrl: './alumno-dialog.component.html',
  styles: ``,
})
export class AlumnoDialogComponent {
  alumnoForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<AlumnoDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: AlumnoDialogData
  ) {
    this.alumnoForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return !!this.data?.editingAlumno;
  }

  patchFormValue() {
    if (this.data?.editingAlumno) {
      this.alumnoForm.patchValue(this.data.editingAlumno);
    }
  }

  onSave(): void {
    if (this.alumnoForm.invalid) {
      this.alumnoForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.alumnoForm.value,
        id: this.isEditing
          ? this.data!.editingAlumno!.id
          : generateRandomString(4),
        createdAt: this.isEditing
          ? this.data!.editingAlumno!.createdAt
          : new Date(),
      });
    }
  }
}