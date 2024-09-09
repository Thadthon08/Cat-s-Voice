import { Component, OnInit } from '@angular/core';
import { FindHomeService } from '../../../services/find-home.service';
@Component({
  selector: 'app-box-saerch',
  templateUrl: './box-saerch.component.html',
  styleUrls: ['./box-saerch.component.css']
})
export class BoxSaerchComponent implements OnInit{
  currentInput!: string ;
  currentSex!: number ;
  currentAge: number = 1; 

  constructor(private findHomeService:FindHomeService) {}

  ngOnInit(): void {
    console.log('Current Age:', this.currentAge);
  }



  selectRadio(animalName: string, event: Event): void {
  event.stopPropagation();
  this.currentInput = animalName;
  console.log(`Selected Animal: ${animalName}`);
  }



  selectRadioSex(animalSex: number, event: Event): void {
    event.stopPropagation();
    this.currentSex = animalSex;
    console.log(`Selected Sex2: ${animalSex}`)
    }



    getAnimals(){
      console.log("curAge: ",this.currentAge , "curIn: ",this.currentInput, "curSex: ",this.currentSex)
    }



    getAnimalType(){
      return this.findHomeService.getAnimalType()
    }

    getAllAge(){
      return this.findHomeService.getAllAge()
    }
}
