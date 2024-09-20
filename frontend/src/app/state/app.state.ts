// app.state.ts
import { AnimalState } from './animal.state';
import { SearchStatus } from './search-status.enum';
export interface AppState {
    animal: AnimalState;
    searchState: SearchStatus;

}
