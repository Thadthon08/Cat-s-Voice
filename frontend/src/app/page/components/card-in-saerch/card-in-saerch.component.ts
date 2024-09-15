import { Component, OnInit, Input } from '@angular/core';
import { Router ,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AnimalService } from '../../../services/animal.service';

@Component({
  selector: 'app-card-in-saerch',
  templateUrl: './card-in-saerch.component.html',
  styleUrls: ['./card-in-saerch.component.css']
})
export class CardInSaerchComponent implements OnInit {

  animals: any[] = []; 
  animalID!: number;
  currentUrl: string = '';
  constructor(    
              private animalService: AnimalService,
              private router: Router
  ) {}

  @Input() currentType: string = '';
  @Input() currentSex!: number;
  @Input() currentAge!: number;
  @Input() search!: boolean;
  @Input() title : string = '';

 
  

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
          this.currentUrl = this.router.url;
          this.loadAnimals();
    });
      this.currentUrl = this.router.url;
      this.loadAnimals();
  }
  


  ngOnChanges(): void {
    this.loadAnimals();
  }

  loadAnimals() {
    this.animalService.getAnimals().subscribe(
      (data) => {
        this.animals = data;
      },
      (error) => {
        console.error('Error fetching animals:', error);
      }
    );

    // if (this.search) {
    //   this.animals = this.findHomeService.getAnimalType();
    //   } else {
    //   this.animals = this.findHomeService.getAllanimals();
    // }
  }

  selectAnimal(id: number) {
     console.log('cur',this.currentUrl,'/',id)
    this.router.navigate([this.currentUrl, id]);
   
  }
  


}