import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { stat } from 'fs';

@Component({
  selector: 'app-animal-management',
  templateUrl: './animal-management.component.html',
  styleUrl: './animal-management.component.css',
})
export class AnimalManagementComponent implements OnInit {
  animalId: string | null = null;
  constructor(private route: ActivatedRoute) {}

  data: any = {
    name: 'ชอนแจ',
    gender: 'เพศเมีย',
    species: 'แมว',
    age: 2,
    color: 'สีขาว',
    personality: 'แมวอ้วน',
    symptoms: 'ไม่มีอาการป่วย',
    image: 'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg',
    status: 'ยังไม่ถูกรับอุปการะ',
  };

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id');
  }
}
