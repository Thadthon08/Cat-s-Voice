import { createReducer, on } from '@ngrx/store';
import { initialAnimalState } from './animal.state';
import * as AnimalActions from './animal.actions';

export const animalReducer = createReducer(
  initialAnimalState,
  on(AnimalActions.setSpecie, (state, { specie }) => ({ ...state, selectSpecie: specie })),
  on(AnimalActions.setAgeRange, (state, { ageRange }) => ({ ...state, selectAgeRange: ageRange })),
  on(AnimalActions.setGender, (state, { gender }) => ({ ...state, selectGender: gender })),
  on(AnimalActions.setSearchStatus, (state, { status }) => ({ ...state, searchStatus: status })) 
);