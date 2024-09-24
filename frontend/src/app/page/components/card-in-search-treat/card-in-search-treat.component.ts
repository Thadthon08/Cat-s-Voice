import { Component, OnInit, Input , OnDestroy } from '@angular/core';
import { HealthRecordService } from '../../../services/healthrecord.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil, switchMap, take, tap, catchError, timeout } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import { AppState } from '../../../../app/state/app.state';
import { selectSpecie, selectAgeRange, selectGender, selectSearchStatus } from '../../../../app/state/animal.selectors';
import { SearchStatus } from '../../../../app/state/search-status.enum';
import { setSearchStatus } from '../../../state/animal.actions';


@Component({
  selector: 'app-card-in-search-treat',
  templateUrl: './card-in-search-treat.component.html',
  styleUrls: ['./card-in-search-treat.component.css']
})


export class CardInSearchTreatComponent implements OnInit , OnDestroy {

  treatment: string | undefined = '';  
  loading: boolean = false; 
  animals: any[] = []; 
  animalID!: number;
  nextUrl: string = '';

  specie$: Observable<number>;
  ageRange$: Observable<string>;
  gender$: Observable<string>;
  searchStatus$: Observable<SearchStatus>;

  private destroy$ = new Subject<void>();

  constructor(    
              private router: Router,
              private helthRecordService : HealthRecordService,
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
      this.loadAnimalsInHelthRecord();
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
      this.searchAnimalsInHelthRecord(specie, ageRange, gender);
    });
    this.nextUrl = this.router.url;
      if( this.nextUrl = '/spayed'){
        this.nextUrl = '/case_treatment';
      }
    this.loadAnimalsInHelthRecord();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

 
  loadAnimalsInHelthRecord(){
    this.loading = true; 
    this.helthRecordService.getHealthRecords().pipe(
      timeout(5000) 
    ).subscribe(
      (data) => {
        console.log(data)
        this.animals = data;
        this.loading = false;
      },
      (error) => {
        if (error.name === 'TimeoutError') {
          console.error('Request timed out');
        } else {
          console.error('Error fetching animals inHelthRecord:', error);
        }
        this.loading = false; 
      }
    );
  }

//รอเปลี่ยน URL
  searchAnimalsInHelthRecord(specie: number | null, ageRange: string | null, gender: string | null) {
    console.log("Searching with specie:", specie, "ageRange:", ageRange, "gender:", gender);

    let request$;
    
  
    if (specie !== null && specie !== 0 && typeof specie !== 'undefined' && gender && typeof gender !== 'undefined'  ) {
      request$ = this.helthRecordService.getAnimalBySpecieGenderAge(specie, gender, ageRange);
  } else if (specie !== null && specie !== 0 && typeof specie !== 'undefined') {
      request$ = this.helthRecordService.getAnimalBySpecieAge(specie, ageRange);
  } else if (gender && typeof gender !== 'undefined') {
      request$ = this.helthRecordService.getAnimalByGenderAge(gender, ageRange);
  } else if (ageRange !== null && typeof ageRange !== 'undefined') {
      request$ = this.helthRecordService.getAnimalByAge(ageRange);
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
                console.log("Response from API:", data);
                if (data && data.animals && Array.isArray(data.animals)) {
                    this.animals = data.animals; // ใช้ data.animals
                } else if (data && Array.isArray(data)) {
                    this.animals = data;
                    console.log("Animals found:", this.animals);
                } else {
                    console.warn("No animals found or data is not an array.");
                    this.animals = [];
                }
                this.loading = false; 
            }
        );
    }
}


  selectAnimal(id: number , treatment:string | undefined) {
    this.router.navigate([this.nextUrl, id],{ queryParams: { treatment: this.treatment = treatment} });
  }
  


}