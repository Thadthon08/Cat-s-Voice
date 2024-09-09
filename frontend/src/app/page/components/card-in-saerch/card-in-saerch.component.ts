import { Component, OnInit } from '@angular/core';
import { FindHomeService } from '../../../services/find-home.service';
@Component({
  selector: 'app-card-in-saerch',
  templateUrl: './card-in-saerch.component.html',
  styleUrl: './card-in-saerch.component.css'
})
export class CardInSaerchComponent implements OnInit {

constructor(private findHomeService:FindHomeService){}

ngOnInit(): void {
  
}

getAllanimals(){
  return this.findHomeService.getAllanimals()
}

}
