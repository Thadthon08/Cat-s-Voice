import { SearchStatus } from "./search-status.enum";

export interface AnimalState {
  selectSpecie: number;
  selectAgeRange: string;
  selectGender: string;
  searchStatus: SearchStatus; 
}

export const initialAnimalState: AnimalState = {
  selectSpecie: 0, 
  selectAgeRange: '0-1', 
  selectGender: '', 
  searchStatus: SearchStatus.Initial,
};