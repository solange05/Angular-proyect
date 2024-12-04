import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../../enrollments/services/enrollment.service';
import { MatTableDataSource } from '@angular/material/table';
import { EnrollmentModel } from '../../../enrollments/models/enrollment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  dataSource = new MatTableDataSource<EnrollmentModel>();
  course: Course | null = null;
  id;

  private subject$ = new Subject();

  displayedColumns: string[] = [
    'actions',
    'id',
    'student',
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
  ){
    this.id =  parseInt(this.activatedRoute.snapshot.params['id']);
    this.courseService.getCourseById(
     this.id
    ).pipe(takeUntil(this.subject$))
    .subscribe((course) => this.course = course);
  }

  ngOnInit(): void {
    this.courseService.getEnrollmentsByCourseId(this.id)
    .subscribe({
      next: (enrollments) => {if(enrollments) this.dataSource.data = enrollments},
      error: (e) => console.error(e),
    })
  }

  removeData(id: number){
    this.courseService.deleteEnrollment(id, this.id);
    Swal.fire('', 'El alumno se ha desinscrito del curso', 'success');
  }

}
