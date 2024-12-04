import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/models/user";


export const SetAuthUser = createAction(
    '[auth] Set User',
    props<{ payload: User}>()
)

export const RemoveAuthUser = createAction(
    '[auth] Remove user'
)