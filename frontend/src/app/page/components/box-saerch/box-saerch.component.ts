import { Component, Input, OnInit } from '@angular/core';
import { FindHomeService } from '../../../services/find-home.service';
import { Router ,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AnimalService } from '../../../services/animal.service';
import { HealthRecordService } from '../../../services/healthrecord.service';


@Component({
  selector: 'app-box-saerch',
  templateUrl: './box-saerch.component.html',
  styleUrls: ['./box-saerch.component.css']
})
export class BoxSaerchComponent implements OnInit{

  @Input() color:string ='';
  @Input() title:string = '';
  currentUrl: string = '';
  currentType!: string ;
  currentSex!: number ;
  currentAge: number = 1;
  search!: boolean ;
  showTreat : boolean = false;
  showFind : boolean = false;
  

  

  constructor(private findHomeService:FindHomeService,
    private router: Router,
  ){}

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
      }
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
