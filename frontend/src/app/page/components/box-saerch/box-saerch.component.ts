import { Component, OnInit } from '@angular/core';
import { FindHomeService } from '../../../services/find-home.service';
@Component({
  selector: 'app-box-saerch',
  templateUrl: './box-saerch.component.html',
  styleUrls: ['./box-saerch.component.css']
})
export class BoxSaerchComponent implements OnInit{
  currentType!: string ;
  currentSex!: number ;
  currentAge: number = 1;
  search!: boolean ; 

  constructor(private findHomeService:FindHomeService) {}

  ngOnInit(): void {
    this.currentType = '';
    this.search = false;
  }


  selectRadio(animalName: string, event: Event): void {
  event.stopPropagation();
  this.currentType = animalName;
  }


  selectRadioSex(animalSex: number, event: Event): void {
    event.stopPropagation();
    this.currentSex = animalSex;
    }


    getAnimals(){
      console.log("curAge: ",this.currentAge , "curIn: ",this.currentType, "curSex: ",this.currentSex)
    }


    getAnimalType(){
      return this.findHomeService.getAnimalType()
    }

    getAllAge(){
      return this.findHomeService.getAllAge()
    }

    searchWorking(){
      return this.search = !this.search
    }
    
}
