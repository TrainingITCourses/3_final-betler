import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromLaunch from './launch.reducer';
import { environment } from 'src/environments/environment';

export interface State {
  launch: fromLaunch.State;
}

export const reducers: ActionReducerMap<State> = {
  launch: fromLaunch.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
