import { Action } from '@ngrx/store';
import { Launch } from 'src/app/store/models/launch';

export enum LaunchActionTypes {
  LoadLaunches = '[Launch] Load Launches',
  SetFilters = '[Launch] Set Filters'
  
}

export class LoadLaunches implements Action {
  readonly type = LaunchActionTypes.LoadLaunches;
  constructor(public readonly payload: Launch[]) { }
}

export class SetFilter implements Action {
  readonly type = LaunchActionTypes.SetFilters;
  constructor(public readonly payload: number) { }
}

export type LaunchActions = LoadLaunches | SetFilter;
