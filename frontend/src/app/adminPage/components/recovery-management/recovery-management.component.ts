import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../../services/animal.service';
import { HealthRecordService } from '../../../services/healthrecord.service';
import { HealthRecord } from '../../../interface/IHealthRecord';

@Component({
  selector: 'app-recovery-management',
  templateUrl: './recovery-management.component.html',
  styleUrl: './recovery-management.component.css',
})
export class RecoveryManagementComponent implements OnInit {
  animalId: string | null = null;
  data: HealthRecord = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private helthService: HealthRecordService
  ) {}

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id');
    if (this.animalId) {
      this.loadAnimalData(this.animalId);
    }
  }

  loadAnimalData(id: string) {
    this.helthService.getHealthRecordById(id).subscribe(
      (response) => {
        this.data = response;
        console.log(this.data);
      },
      (error) => {
        console.error('Error fetching animal data:', error);
      }
    );
  }
  navigateToEditData() {
    this.router.navigate(['/admin/recovering/edit', this.animalId]);
  }
}
