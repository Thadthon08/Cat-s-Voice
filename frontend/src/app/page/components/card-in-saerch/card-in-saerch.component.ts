import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil, switchMap, take, tap, catchError, timeout } from 'rxjs/operators';
import { AnimalNoAuthService } from '../../../services/animal-no-auth.service';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import { AppState } from '../../../../app/state/app.state';
import { selectSpecie, selectAgeRange, selectGender, selectSearchStatus } from '../../../../app/state/animal.selectors';
import { SearchStatus } from '../../../../app/state/search-status.enum';
import { setSearchStatus } from '../../../state/animal.actions';

@Component({
  selector: 'app-card-in-saerch',
  templateUrl: './card-in-saerch.component.html',
  styleUrls: ['./card-in-saerch.component.css']
})
export class CardInSaerchComponent implements OnInit, OnDestroy {

  animals: any[] = [];
  loading: boolean = false; 


  specie$: Observable<number>;
  ageRange$: Observable<string>;
  gender$: Observable<string>;
  searchStatus$: Observable<SearchStatus>;

  private destroy$ = new Subject<void>();

  constructor(
    private animalService: AnimalNoAuthService,
    private router: Router,
    private store: Store<AppState>,
  ) { 
    this.specie$ = this.store.select(selectSpecie);
    this.ageRange$ = this.store.select(selectAgeRange);
    this.gender$ = this.store.select(selectGender);
    this.searchStatus$ = this.store.select(selectSearchStatus);
  }

   
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.loadAnimals();
    });

    this.searchStatus$.pipe(
      takeUntil(this.destroy$),
      tap(search => console.log(search)), 
      switchMap(search => {
        if (search === SearchStatus.Searching ) { 
          return combineLatest([this.specie$, this.ageRange$, this.gender$]).pipe(
            take(1),
            tap(() => this.store.dispatch(setSearchStatus({ status: SearchStatus.Initial })))
          );
        } else {
          return of([]); 
        }
      })
    ).subscribe(([specie, ageRange, gender]) => {
      this.searchAnimals(specie, ageRange, gender);
    });

    this.loadAnimals();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAnimals(){
    this.loading = true; 
    this.animalService.getAnimals().pipe(
      timeout(5000) 
    ).subscribe(
      (data) => {
        this.animals = data.animals;
        this.loading = false;
      },
      (error) => {
        if (error.name === 'TimeoutError') {
          console.error('Request timed out');
        } else {
          console.error('Error fetching animals:', error);
        }
        this.loading = false; 
      }
    );
  
  }
    
    searchAnimals(specie: number | null, ageRange: string | null, gender: string | null) {

      let request$;
      
    
      if (specie !== null && specie !== 0 && typeof specie !== 'undefined' && gender && typeof gender !== 'undefined'  ) {
        request$ = this.animalService.getAnimalBySpecieGenderAge(specie, gender, ageRange);
    } else if (specie !== null && specie !== 0 && typeof specie !== 'undefined') {
        request$ = this.animalService.getAnimalBySpecieAge(specie, ageRange);
    } else if (gender && typeof gender !== 'undefined') {
        request$ = this.animalService.getAnimalByGenderAge(gender, ageRange);
    } else if (ageRange !== null && typeof ageRange !== 'undefined') {
        request$ = this.animalService.getAnimalByAge(ageRange);
    }
    
  
      
      if (request$) {
          this.loading = true; 
          request$.pipe(
              timeout(3000), 
              catchError((error) => {
                  console.error('Error fetching animals:', error);
                  this.loading = false; 
                  this.animals = []; 
                  return of([]); 
              })
          ).subscribe(
              (data) => {
                  if (data && data.animals && Array.isArray(data.animals)) {
                      this.animals = data.animals; // ใช้ data.animals
                  } else if (data && Array.isArray(data)) {
                      this.animals = data;
                  } else {
                      console.warn("No animals found or data is not an array.");
                      this.animals = [];
                  }
                  this.loading = false; 
              }
          );
      }
  }

  selectAnimal(id: number) {
    this.router.navigate([this.router.url, id]);
  }
}