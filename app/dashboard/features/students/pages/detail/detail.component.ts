import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { EnrollmentService } from '../../../enrollments/services/enrollment.service';
import { EnrollmentModel } from '../../../enrollments/models/enrollment';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  dataSource = new MatTableDataSource<EnrollmentModel>();
  student: Student | undefined;
  id;

  private subject$ = new Subject();

  displayedColumns: string[] = [
    'actions',
    'id',
    'course',
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
  ){
    this.id =  parseInt(this.activatedRoute.snapshot.params['id']);
    this.studentService.getStudentById(
      parseInt(this.activatedRoute.snapshot.params['id'])
    ).pipe(takeUntil(this.subject$))
    .subscribe((student) => {if(student) this.student = student});
  }

  ngOnInit(): void {
    this.studentService.getEnrollmentsByStudentId(this.id)
    .subscribe({
      next: (enrollments) =>{ if(enrollments) this.dataSource.data = enrollments },
      error: (e) => console.error(e),
    })
  }

  removeData(id: number){
    this.studentService.deleteEnrollment(id, this.id);
    Swal.fire('', 'El alumno se ha desinscrito del curso', 'success');
  }
}
