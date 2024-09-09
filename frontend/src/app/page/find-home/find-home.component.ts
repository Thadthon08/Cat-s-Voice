import { Component, Injectable, OnInit } from '@angular/core';
import { animal } from '../../animals.model';
interface Animal_type {
  id: number;
  name: string;
}

interface Age {
  id: number;
  rang_age: string;
}

@Injectable()
@Component({
  selector: 'app-find-home',
  templateUrl: './find-home.component.html',
  styleUrls: ['./find-home.component.css']
})
export class FindHomeComponent implements OnInit {

  animal_type: Animal_type[] = [
    { id: 1, name: 'สุนัข' },
    { id: 2, name: 'แมว' },
    { id: 3, name: 'อื่นๆ' }
  ];

  age:Age[] = [
    {id:1 ,rang_age:"อายุ 0-1 ปี" }
    ,{id:2 ,rang_age:"อายุ 1-5 ปี" }
    ,{id:3 ,rang_age:"อายุ 5-10 ปี" }
    ,{id:4 ,rang_age:"อายุ 10 ปี ขึ้นไป" }
  ]

  animals: animal = [
    {
      name: 'กังฟู',
      sex: 1, // เพศผู้
      ageYears: 3,
      ageMonths: 1,
      ageDays: 25,
      breed: 'ไทย',
      color: 'สีขาว ลายน้ำตาล แต้มดำ',
      characteristics: 'หน้าหล่อ ปราดเปรียว',
      personality: 'น่ารัก เรียบร้อย',
      conditions: [],
    },
    {
      name: 'มีนา',
      sex: 0, // เพศเมีย
      ageYears: 1,
      breed: 'เปอร์เซีย',
      color: 'สีขาว',
      characteristics: 'ขนปุย ตาสีฟ้า',
      personality: 'ขี้เล่น ซุกซน',
      conditions: [],
    },
    {
      name: 'เจ้าทอง',
      sex: 1, // เพศผู้
      ageYears: 5,
      breed: 'โกลเด้น รีทรีฟเวอร์',
      color: 'สีทอง',
      characteristics: 'ตัวใหญ่ ขนฟู',
      personality: 'ขี้ประจบ ร่าเริง',
      conditions: [],
    },
    {
      name: 'บุญรอด',
      sex: 1, // เพศผู้
      ageYears: 2,
      ageMonths: 6,
      breed: 'ไทย',
      color: 'สีดำ',
      characteristics: 'ผอม สูง',
      personality: 'ขี้กลัว เรียบร้อย',
      conditions: ['เป็นหวัด'],
    },
    {
      name: 'มะลิ',
      sex: 0, // เพศเมีย
      ageYears: 7,
      breed: 'ไทย',
      color: 'สีน้ำตาล',
      characteristics: 'ตาบอดข้างหนึ่ง',
      personality: 'ใจดี อ่อนโยน',
      conditions: ['ตาบอด'],
    },
    {
      name: 'ลัคกี้',
      sex: 1, // เพศผู้
      ageYears: 10,
      breed: 'ลาบราดอร์',
      color: 'สีดำ',
      characteristics: 'อ้วน ตัวใหญ่',
      personality: 'ขี้เกียจ กินเก่ง',
      conditions: ['โรคอ้วน'],
    },
    {
      name: 'ไข่ตุ๋น',
      sex: 0, // เพศเมีย
      ageYears: 1,
      ageMonths: 3,
      breed: 'สก๊อตติช โฟลด์',
      color: 'สีเทา',
      characteristics: 'หูตก',
      personality: 'ขี้เซา ชอบนอน',
      conditions: [],
    },
    {
      name: 'ข้าวต้ม',
      sex: 1, // เพศผู้
      ageYears: 4,
      breed: 'ไทย',
      color: 'สีขาว-ดำ',
      characteristics: 'หางสั้น',
      personality: 'ซุกซน กวน',
      conditions: [],
    },
    {
      name: 'ซูชิ',
      sex: 0, // เพศเมีย
      ageYears: 2,
      breed: 'ชิบะ อินุ',
      color: 'สีน้ำตาลอ่อน',
      characteristics: 'หน้าเหมือนสุนัขจิ้งจอก',
      personality: 'ฉลาด ร่าเริง',
      conditions: [],
    },
    {
      name: 'เฉาก๊วย',
      sex: 1, // เพศผู้
      ageYears: 6,
      breed: 'ไทย',
      color: 'สีดำ',
      characteristics: 'มีแผลเป็นที่ขา',
      personality: 'ใจดี รักสงบ',
      conditions: ['แผลเป็น'],
    },
  ];

  currentInput!: string ;
  currentSex!: number ;
  currentAge: number = 1; 

  constructor() {}

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

    getAllAge(){
      return this.age;
    }

    getAnimals(){
      console.log("curAge: ",this.currentAge , "curIn: ",this.currentInput, "curSex: ",this.currentSex)
    }

    getAllanimals(){
      return this.animals
    }
 

    
}
