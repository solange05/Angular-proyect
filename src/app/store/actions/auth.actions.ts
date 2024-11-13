import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Alumno } from '../../features/dashboard/alumnos/models'; // Cambiado de 'users' a 'alumnos'

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Set Authenticated User': props<{ user: Alumno }>(), // Cambiado de 'User' a 'Alumno'
    'Unset Authenticated User': emptyProps(),
  },
});