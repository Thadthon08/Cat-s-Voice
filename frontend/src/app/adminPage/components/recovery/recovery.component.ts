import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HealthRecordService } from '../../../services/healthrecord.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css'],
})
export class RecoveryComponent implements OnInit {
  animals: any[] = []; // ตัวแปรสำหรับเก็บข้อมูลสัตว์

  constructor(
    private router: Router,
    private healthRecordService: HealthRecordService
  ) {} // inject service

  ngOnInit(): void {
    // เรียกข้อมูลเมื่อ component โหลดขึ้น
    this.getAnimals();
  }

  getAnimals(): void {
    this.healthRecordService.getHealthRecords().subscribe(
      (data) => {
        this.animals = data.map((record: any) => {
          return {
            name: record.animal_id.name,
            image_url: record.animal_id.image_url,
          };
        });
      },
      (error) => {
        console.error('Error fetching health records:', error);
      }
    );
  }

  navigateToAddData(): void {
    this.router.navigate(['/admin/add-data']);
  }
}
