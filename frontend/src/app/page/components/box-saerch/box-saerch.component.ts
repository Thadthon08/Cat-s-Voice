import { Component, Input, OnInit } from '@angular/core';
import { FindHomeService } from '../../../services/find-home.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { setSpecie, setAgeRange, setGender, setSearchStatus } from '../../../../app/state/animal.actions';
import { selectSpecie, selectAgeRange, selectGender, selectSearchStatus } from '../../../../app/state/animal.selectors';
import { Observable } from 'rxjs';
import { AppState } from '../../../../app/state/app.state';
import { Store } from '@ngrx/store';
import { SearchStatus } from '../../../../app/state/search-status.enum';
@Component({
  selector: 'app-box-saerch',
  templateUrl: './box-saerch.component.html',
  styleUrls: ['./box-saerch.component.css']
})
export class BoxSaerchComponent implements OnInit {

  @Input() color: string = '';
  @Input() title: string = '';

  showTreat = false;
  showFind = false;
  currentUrl: string = '';

  specie$: Observable<number>;
  ageRange$: Observable<number>;
  gender$: Observable<string>;
  searchStatus$: Observable<SearchStatus>; 

  constructor(
    private findHomeService: FindHomeService,
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
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
          
    });
      this.currentUrl = this.router.url;
      if( this.currentUrl == '/find_home' ){
         this.showFind = !this.showFind;
      }else{
          this.showTreat = !this.showTreat;
      };
  }

  selectRadioSpecies(animalSpecie: number): void {
    this.store.dispatch(setSpecie({ specie: animalSpecie }));
  }

  selectRadioSex(animalSex: string): void {
    const gender = animalSex ;
    this.store.dispatch(setGender({ gender }));
  }

  getAllAge() {
    return this.findHomeService.getAllAge();
  }

  searchWorking() {
    this.store.dispatch(setSearchStatus({ status: SearchStatus.Searching }));
  }
  

  selectAgeRange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const ageRange = parseInt(target.value, 10);
    this.store.dispatch(setAgeRange({ ageRange }));
  }

}