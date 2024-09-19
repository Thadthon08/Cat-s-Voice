import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HealthRecordService } from '../../../services/healthrecord.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css'],
})
export class RecoveryComponent implements OnInit {
  animals: any[] = [];

  constructor(
    private router: Router,
    private healthRecordService: HealthRecordService
  ) {}

  ngOnInit(): void {
    this.getAnimals();
  }

  getAnimals(): void {
    this.healthRecordService.getHealthRecords().subscribe(
      (data) => {
        this.animals = data.map((record: any) => {
          return {
            _id: record._id,
            name: record.animal_id?.name,
            image_url: record.animal_id?.image_url,
          };
        });
      },
      (error) => {
        console.error('Error fetching health records:', error);
      }
    );
  }

  navigateToAddData(): void {
    this.router.navigate(['/admin/recovering/add-data']);
  }

  onAnimalCardClick(id: string): void {
    this.router.navigate(['/admin/recovering', id]);
  }
}
