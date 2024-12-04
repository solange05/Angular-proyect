import { Injectable } from '@angular/core';
import { Course, formDataCourse } from '../models/course';
import { BehaviorSubject, Observable, take, map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { EnrollmentModel } from '../../enrollments/models/enrollment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private enrollments$ = new BehaviorSubject<EnrollmentModel[] | null>(
    null
  );

  constructor(private httpClient: HttpClient){
  }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(
      `${environment.apiBaseUrl}/courses`
    );
  }

  getCourseById(id: number): Observable<Course>{
    return this.httpClient.get<Course>( 
      `${environment.apiBaseUrl}/courses`,
      {
        params: {
          id: id
        }
      }
    );
  }
  

  createCourse(newCourse: formDataCourse): Observable<Course>{
    return this.httpClient.post<Course>(
      `${environment.apiBaseUrl}/courses`, newCourse
    )
  }

  editCourse(modifiedCourse: Course): Observable<Course>{
    return this.httpClient.put<Course>(
      `${environment.apiBaseUrl}/courses/${modifiedCourse.id}`, modifiedCourse
    )
  }

  deleteCourse(courseId: number): Observable<unknown> {
   return this.httpClient.delete<Course[]>(
      `${environment.apiBaseUrl}/courses/${courseId}`
    )
  }

  getEnrollmentsByCourseId(id: number): Observable<EnrollmentModel[] | null> {
    this.httpClient.get<EnrollmentModel[]>(
      `${environment.apiBaseUrl}/enrollments?courseId=${id}&_expand=course&_expand=student`, 
    ).subscribe({
      next: (enrollments) => {
        this.enrollments$.next(enrollments);
      },
      complete: () => {},
      error: () => {
        return 'Ocurrió un error al obtener la información';
      }
    })

    return this.enrollments$.asObservable();
  }

  deleteEnrollment(enrollmentId: number, courseId: number): void {
    this.httpClient.delete(
      `${environment.apiBaseUrl}/enrollments/${enrollmentId}`
    ).subscribe({
      next: () => {
        this.getEnrollmentsByCourseId(courseId);
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al eliminar la inscripción', 'error')
      }
    })
  }

}
