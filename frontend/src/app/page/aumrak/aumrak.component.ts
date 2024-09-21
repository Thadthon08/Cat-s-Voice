import { Component, OnInit, Input } from '@angular/core';
import { Router , } from '@angular/router';

@Component({
  selector: 'app-aumrak',
  templateUrl: './aumrak.component.html',
  styleUrl: './aumrak.component.css'
})
export class AumrakComponent {

  animals: any[] = []; 
  animalID!: number;
  currentUrl: string = '';
  
  constructor( private router: Router) {}

  Click(): void {
    this.router.navigate(['/donate']);
  }
  
}
