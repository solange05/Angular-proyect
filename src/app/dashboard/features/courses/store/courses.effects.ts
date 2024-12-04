import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CoursesActions } from './courses.actions';
import { CourseService } from '../services/course.service';


@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.loadCourses),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.courseService.getCourses().pipe(
          map(data => CoursesActions.loadCoursesSuccess({ data })),
          catchError(error => of(CoursesActions.loadCoursesFailure({ error }))))
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.createCourse),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.courseService.createCourse(action.data).pipe(
          map(data => CoursesActions.createCourseSuccess({ data })),
          catchError(error => of(CoursesActions.deleteCourseFailure({ error }))))
      )
    );
  });

  editCourse$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.editCourse),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.courseService.editCourse(action.data).pipe(
          map(data => CoursesActions.editCourseSuccess({ data })),
          catchError(error => of(CoursesActions.editCourseFailure({ error }))))
      )
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.deleteCourse),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.courseService.deleteCourse(action.id).pipe(
          map(data => CoursesActions.deleteCourseSuccess({ data: action.id })),
          catchError(error => of(CoursesActions.deleteCourseFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private courseService: CourseService) {}
}
