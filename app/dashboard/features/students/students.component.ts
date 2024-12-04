import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from './models/student';
import { Observable, Subscription, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from './services/student.service';
import Swal from 'sweetalert2';
import { CreateUpdateComponent } from './dialogs/create-update/create-update.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  dataSource = new MatTableDataSource<Student>();
  authUser$: Observable<User | null>;

  displayedColumns: string[] = [
    'actions',
    'id',
    'fullName',
    'email',
    'phone',
    'birthDate',
    'gender',
  ];

  constructor(
    public dialog: MatDialog,
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.getUser();
  }

  ngOnInit(): void {
    this.studentService.getStudents() 
    .subscribe({
      next: (students) => {
        if(students) this.dataSource.data = students
      },
      error: (e) =>  Swal.fire( e, '', 'error'),
    })

  }


  removeData(student: Student) {
    this.studentService.deleteStudent(student.id);
    Swal.fire('', `${student.name} ha sido eliminado(a)`, 'success');
  }

  openCreateStudentDialog(): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent);
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.studentService.createStudent(formData);
        Swal.fire('', `${formData.name} ha sido sido creado(a)`, 'success');
      }
    });
  }

  editData(student: Student): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      data: {
        student
      },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.studentService.editStudent(student.id, formData)
        Swal.fire('', `${formData.name} ha sido modificado(a)`, 'success');
      }
    });
  }

  showDetails(studentId: number): void {
    this.router.navigate([studentId], {
      relativeTo: this.activatedRoute
    })
  }
}
