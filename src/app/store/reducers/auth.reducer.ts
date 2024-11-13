import { createReducer, on } from '@ngrx/store';
import { Alumno } from '../../features/dashboard/alumnos/models'; 
import { AuthActions } from '../actions/auth.actions';

export const authFeatureName = 'auth';

export interface AuthState {
  authenticatedUser: Alumno | null; 
}

const initialState: AuthState = {
  authenticatedUser: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setAuthenticatedUser, (state, action) => {
    return {
      ...state,
      authenticatedUser: action.user,
    };
  }),
  on(AuthActions.unsetAuthenticatedUser, (state) => {
    return {
      ...state,
      authenticatedUser: null,
    };
  })
);