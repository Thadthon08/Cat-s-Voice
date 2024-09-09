import { Component, OnInit, Input } from '@angular/core';
import { FindHomeService } from '../../../services/find-home.service';

@Component({
  selector: 'app-card-in-saerch',
  templateUrl: './card-in-saerch.component.html',
  styleUrls: ['./card-in-saerch.component.css']
})
export class CardInSaerchComponent implements OnInit {

  animals: any[] = []; 

  constructor(private findHomeService: FindHomeService) {}

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
}