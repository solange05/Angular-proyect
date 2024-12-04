import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/core/models/user";
import { RemoveAuthUser, SetAuthUser } from "./auth.actions";


export const authFeatureKey = 'auth';

export interface AuthState {
    authUser: User | null;
}

const initialState: AuthState = {
    authUser: null
}

export const authReducer = createReducer(
    initialState,

    on(SetAuthUser, (currentState, { payload }) => {
        return {
            authUser: payload
        }
    }),

    on(RemoveAuthUser, (currentState) => {
        return {
            authUser: null
        }
    })
)