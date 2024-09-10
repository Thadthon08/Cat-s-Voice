import { Component, OnInit, Input } from '@angular/core';
import { FindHomeService } from '../../../services/find-home.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-in-saerch',
  templateUrl: './card-in-saerch.component.html',
  styleUrls: ['./card-in-saerch.component.css']
})
export class CardInSaerchComponent implements OnInit {

  animals: any[] = []; 
  animalID!: number;

  constructor(private findHomeService: FindHomeService, private router: Router) {}

  @Input() currentType: string = '';
  @Input() currentSex!: number;
  @Input() currentAge!: number;
  @Input() search!: boolean;

  ngOnInit(): void {
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
    this.router.navigate(['/find_home',id]);
  }


}