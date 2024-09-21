import { createAction, props } from '@ngrx/store';
import { SearchStatus } from './search-status.enum';

export const setSearchStatus = createAction(
  '[Animal] Set Search Status',
  props<{ status: SearchStatus }>()
);

export const setSpecie = createAction(
  '[Animal] Set Specie',
  props<{ specie: number }>()
);

export const setAgeRange = createAction(
  '[Animal] Set Age Range',
  props<{ ageRange: string }>()
);

export const setGender = createAction(
  '[Animal] Set Gender',
  props<{ gender: string }>()
);

export const toggleSearch = createAction('[Animal] Toggle Search');