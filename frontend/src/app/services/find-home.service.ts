import { Injectable } from '@angular/core';
import { animal } from '../animals.model';
import { animalType } from '../animalType.model';
import { animalAge } from '../animalAge.model';
@Injectable()

export class FindHomeService {

  constructor(){ }

  
  animals: animal = [
    {
      id:1,
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
      id:2,
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
      id:3,
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
      id:4,
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
      id:5,
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
      id:6,
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
      id:7,
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
      id:8,
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
      id:9,
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
      id:10,
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

  getAllanimals(){
    return this.animals
  }


  animal_type: animalType = [
    { id: 1, name: 'สุนัข' },
    { id: 2, name: 'แมว' },
    { id: 3, name: 'อื่นๆ' }
  ];


  getAnimalType(){
    return this.animal_type
  }

  animal_age: animalAge = [
    {id:1 ,rang_age:"อายุ 0-1 ปี" }
    ,{id:2 ,rang_age:"อายุ 1-5 ปี" }
    ,{id:3 ,rang_age:"อายุ 5-10 ปี" }
    ,{id:4 ,rang_age:"อายุ 10 ปี ขึ้นไป" }
  ]

  getAllAge(){
    return this.animal_age;
  }

}
