import { Component, OnInit, Input } from '@angular/core';
import { Router ,NavigationEnd } from '@angular/router';
import { filter, timeout } from 'rxjs/operators';
import { HealthRecordService } from '../../../services/healthrecord.service';


@Component({
  selector: 'app-card-in-search-treat',
  templateUrl: './card-in-search-treat.component.html',
  styleUrl: './card-in-search-treat.component.css'
})


export class CardInSearchTreatComponent implements OnInit {

  animals: any[] = []; 
  animalID!: number;
  currentUrl: string = '';
  loading: boolean = false; 
  constructor(    
              private router: Router,
              private helthRecordService : HealthRecordService,
  ) {}

//  ใน  app-card-in-saerch.component.ts  และ  app-card-in-search-treat.component.ts


  @Input() title : string = '';
  treatment: string | undefined = '';
 
  

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
          this.loadAnimalsInHelthRecord();
    });
      this.currentUrl = this.router.url;
      if( this.currentUrl = '/spayed'){
        this.currentUrl = '/case_treatment';
      }
      this.loadAnimalsInHelthRecord();
  }
  


  ngOnChanges(): void {
    this.loadAnimalsInHelthRecord();
  }
 
  loadAnimalsInHelthRecord(){
    this.loading = true; 
    this.helthRecordService.getHealthRecords().pipe(
      timeout(5000) 
    ).subscribe(
      (data) => {
        this.animals = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching animals:', error);
      }
    );
  }


  selectAnimal(id: number , treatment:string | undefined) {
    this.router.navigate([this.currentUrl, id],{ queryParams: { treatment: this.treatment = treatment} });
  }
  


}