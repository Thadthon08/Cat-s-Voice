import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthRecordService } from '../../../services/healthrecord.service';
import { HealthRecord } from '../../../interface/IHealthRecord';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recovery-management',
  templateUrl: './recovery-management.component.html',
  styleUrls: ['./recovery-management.component.css'], // แก้ไขจาก styleUrl เป็น styleUrls
})
export class RecoveryManagementComponent implements OnInit {
  animalId: string | null = null;
  data: HealthRecord = {}; // กำหนดค่าเริ่มต้นให้กับ data เพื่อป้องกันข้อผิดพลาด

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private helthService: HealthRecordService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private location: Location
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

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this animal?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteHelthRecord();
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Deletion cancelled',
          life: 3000,
        });
      },
    });
  }

  deleteHelthRecord() {
    if (this.animalId) {
      this.helthService.deleteHealthRecordById(this.animalId).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Health record deleted successfully!',
            life: 3000,
          });
          setTimeout(() => this.location.back(), 3000); // กลับไปยังหน้าก่อนหน้า
        },
        (error) => {
          console.error('Error deleting health record:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete health record.',
            life: 3000,
          });
        }
      );
    } else {
      console.error('Animal ID is null');
    }
  }
}
