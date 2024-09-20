import { SearchStatus } from "./search-status.enum";

export interface AnimalState {
  selectSpecie: number;
  selectAgeRange: number;
  selectGender: string;
  
  searchStatus: SearchStatus; 
}

export const initialState: AnimalState = {
  selectSpecie: 0, // ค่าเริ่มต้น
  selectAgeRange: 1, // ค่าเริ่มต้น
  selectGender: '', // ค่าเริ่มต้น
  searchStatus: SearchStatus.Initial,

};