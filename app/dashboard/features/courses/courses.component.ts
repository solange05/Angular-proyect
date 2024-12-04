import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from './models/course';
import { Observable, Subscription, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from './services/course.service';
import Swal from 'sweetalert2';
import { CreateUpdateComponent } from './dialogs/create-update/create-update.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/core/models/user';
import { Store } from '@ngrx/store';
import { CoursesActions } from './store/courses.actions';
import { selectCoursesState, selectCoursesValue } from './store/courses.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  dataSource = new MatTableDataSource<Course>();
  authUser$: Observable<User | null>;
  isLoading: boolean = true;

  displayedColumns: string[] = [
    'actions',
    'id',
    'name',
    'startDate',
    'endDate',
    'time',
    'teacher'
  ];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private courseService: CourseService,
    private store: Store
  ){
    this.authUser$ = this.authService.getUser();
    this.store.select(selectCoursesState).subscribe({
      next: (value) => {
        this.dataSource.data = value.courses,
        this.isLoading = value.loading
        if(value.error){
          Swal.fire('', 'Ocurrió un error','error')
        }
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses());
  }


  removeData(id: number){
    this.store.dispatch(CoursesActions.deleteCourse({id}));
  }

  openCreateCourseDialog(): void{
    const dialogRef = this.dialog.open(CreateUpdateComponent);
    dialogRef.afterClosed().subscribe((formData) => {
      if(formData){
        this.store.dispatch(CoursesActions.createCourse({data: formData}));
      }
    });
  }

  editData(course: Course): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      data: {
        course
      },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      if(formData) {
        formData.id = course.id;
        this.store.dispatch(CoursesActions.editCourse({data: formData }))
      }
    });
  }

  showDetails(courseId: number): void {
    this.router.navigate([courseId], {
      relativeTo: this.activatedRoute
    })
  }

}
