import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from '../models/course';
import Swal from 'sweetalert2';

export const coursesFeatureKey = 'courses';

export interface State {
  loading: boolean,
  courses: Course[],
  error: unknown
}

export const initialState: State = {
  loading: false,
  courses: [],
  error: null
};

export const reducer = createReducer(
  initialState,

  on(CoursesActions.loadCourses, state => {
    return {
      ...state,
      loading: true
    }
  }),

  on(CoursesActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      courses: action.data
    }
  }),

  on(CoursesActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

  //Create
  on(CoursesActions.createCourse, state => {
    return {
      ...state,
      loading: true
    }
  }),

  on(CoursesActions.createCourseSuccess, (state, action) => {
    Swal.fire('', `El curso ${action.data.name} ha sido sido creado`, 'success');
    return {
      ...state,
      loading: false,
      courses: [...state.courses, action.data]
    }
  }),

  on(CoursesActions.createCourseFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

  //Edit
  on(CoursesActions.editCourse, state => {
    return {
      ...state,
      loading: true
    }
  }),

  on(CoursesActions.editCourseSuccess, (state, action) => {
    Swal.fire('', `El curso ${action.data.name} ha sido sido modificado`, 'success');
    return {
      ...state,
      loading: false,
      courses: state.courses.map((currentCourse) =>
        currentCourse.id == action.data.id ?
         ({...currentCourse, ...action.data}) : currentCourse
      )
    }
  }),

  on(CoursesActions.createCourseFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

  //Delete
  on(CoursesActions.deleteCourse, (state) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(CoursesActions.deleteCourseSuccess, (state, action) => {
    Swal.fire('', `El curso ha sido eliminado`, 'success');
    return {
      ...state,
      loading: false,
      courses: state.courses.filter((i) => i.id !== action.data)
    }
  }),

  on(CoursesActions.deleteCourseFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),
);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});

