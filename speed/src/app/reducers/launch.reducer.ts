import { Action } from '@ngrx/store';
import { LaunchActions, LaunchActionTypes } from './launch.actions';
import { throwError } from 'rxjs';
import { Launch } from 'src/app/store/models/launch';


export interface State {
  launches: Launch[];
  filteredLaunches: Launch[];
  filter: number;
}

export const initialState: State = {

  launches: [],
  filteredLaunches: [],
  filter: -1

};

export function reducer(state = initialState, action: LaunchActions): State {
  var act: string;
  act = action.type;
  if (act != "@ngrx/store/init") {
    console.log("----- entering launch reducer with action: ");
    console.log(action);
  }

  switch (action.type) {
    case LaunchActionTypes.LoadLaunches:
      state.launches = action.payload;
      return { ...state };
    case LaunchActionTypes.SetFilters:
      state.filter = action.payload;
      return { ...state };
    default:
      if (act != "@ngrx/store/init") {
        console.log("Something is awfully wrong");
      }
  }
}
