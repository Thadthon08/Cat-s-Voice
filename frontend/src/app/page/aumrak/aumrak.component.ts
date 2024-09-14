import { Component, OnInit, Input } from '@angular/core';
import { FindHomeService } from '../../services/find-home.service';
import { Router ,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-aumrak',
  templateUrl: './aumrak.component.html',
  styleUrl: './aumrak.component.css'
})
export class AumrakComponent {

  animals: any[] = []; 
  animalID!: number;
  currentUrl: string = '';
  constructor(private findHomeService: FindHomeService, private router: Router) {}

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
      console.log('Current URL:', this.currentUrl);
  
      this.loadAnimals();
    });
      this.currentUrl = this.router.url;
    this.loadAnimals();
  }
  


  ngOnChanges(): void {
    this.loadAnimals();
  }

  loadAnimals() {
    if (this.search) {
      this.animals = this.findHomeService.getAnimalType();
      } else {
      this.animals = this.findHomeService.getAllanimals();
    }
  }

  selectAnimal(id: number) {
    this.router.navigate([this.currentUrl, id]);
    console.log('cur',this.currentUrl)
  }
  

}
