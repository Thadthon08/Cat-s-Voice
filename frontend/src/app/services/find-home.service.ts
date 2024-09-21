import { Injectable } from '@angular/core';
import { animalAge } from '../animalAge.model';
@Injectable()

export class FindHomeService {

  constructor(){ }

  animal_age: animalAge = [
    {id:1 ,rang_age:"อายุ 0-1 ปี",age:"0-1" }
    ,{id:2 ,rang_age:"อายุ 1-5 ปี",age:"1-5"}
    ,{id:3 ,rang_age:"อายุ 5-10 ปี",age:"5-10" }
    ,{id:4 ,rang_age:"อายุ 10 ปี ขึ้นไป" ,age:"10"}
  ]

  getAllAge(){
    return this.animal_age;
  }

}
