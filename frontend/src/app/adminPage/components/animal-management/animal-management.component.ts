import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../../services/animal.service';

@Component({
  selector: 'app-animal-management',
  templateUrl: './animal-management.component.html',
  styleUrls: ['./animal-management.component.css'], // แก้เป็น styleUrls (urls ต้องใช้ s เพราะเป็น array)
})
export class AnimalManagementComponent implements OnInit {
  animalId: string | null = null;
  data: any = {};

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService
  ) {}

  ngOnInit(): void {
    // รับ animalId จาก URL parameter
    this.animalId = this.route.snapshot.paramMap.get('id');
    if (this.animalId) {
      this.loadAnimalData(this.animalId);
    }
  }

  // ฟังก์ชันดึงข้อมูลสัตว์จาก backend โดยใช้ animalId
  loadAnimalData(id: string) {
    this.animalService.getAnimalById(id).subscribe(
      (response) => {
        this.data = response; // สมมติว่าข้อมูลของสัตว์ถูกส่งมาใน response
      },
      (error) => {
        console.error('Error fetching animal data:', error);
      }
    );
  }
}
