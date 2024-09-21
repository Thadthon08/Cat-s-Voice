import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdopterService } from '../../../services/adopter.service';

@Component({
  selector: 'app-adoption-management',
  templateUrl: './adoption-management.component.html',
  styleUrls: ['./adoption-management.component.css'], // เปลี่ยนจาก styleUrl เป็น styleUrls
})
export class AdoptionManagementComponent implements OnInit {
  animalId: string | null = null;
  data: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adopterService: AdopterService, // ใช้ AnimalService
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id'); // ดึง animalId จาก URL
    if (this.animalId) {
      this.loadAdoptionData(this.animalId); // ดึงข้อมูลการรับเลี้ยงแทนข้อมูลสัตว์
    }
  }

  confirmAccept() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to approve this adoption?',
      header: 'Confirm Approval',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accept();
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Adoption approval has been cancelled.',
          life: 3000,
        });
      },
    });
  }

  loadAdoptionData(id: string) {
    this.adopterService.getAdoptionByAnimalId(id).subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching adoption data:', error);
      }
    );
  }

  navigateToEditData() {
    this.router.navigate(['/admin/findhome/edit-data/', this.animalId]);
  }

  accept() {
    this.adopterService
      .updateAdoptionStatus(this.data._id, 'completed')
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Adoption has been approved successfully!',
            life: 3000,
          });
          setTimeout(() => this.router.navigate(['/admin/findhome']), 3000);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to approve adoption.',
            life: 3000,
          });
        }
      );
  }

  denyRequest() {
    this.adopterService
      .updateAdoptionStatus(this.data._id, 'cancelled')
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Adoption has been denied successfully!',
            life: 3000,
          });
          setTimeout(() => this.router.navigate(['/admin/findhome']), 3000);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to deny adoption.',
            life: 3000,
          });
        }
      );
  }
}
