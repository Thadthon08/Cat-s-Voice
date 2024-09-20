import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnimalState } from './animal.state';

export const selectAnimalState = createFeatureSelector<AnimalState>('animal'); 

export const selectSpecie = createSelector(
  selectAnimalState,
  (state: AnimalState) => state.selectSpecie
);

export const selectAgeRange = createSelector(
  selectAnimalState,
  (state: AnimalState) => state.selectAgeRange
);

export const selectGender = createSelector(
  selectAnimalState,
  (state: AnimalState) => state.selectGender
);

export const selectSearchStatus = createSelector(
  selectAnimalState,
  (state: AnimalState) => state.searchStatus 
);