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

      this.animals = this.findHomeService.getAllanimals();
 
  }

  selectAnimal(id: number) {
    this.router.navigate([this.currentUrl, id]);
    console.log('cur',this.currentUrl)
  }
  

  Click(): void {
    this.router.navigate(['/donate']);
  }
  
}
