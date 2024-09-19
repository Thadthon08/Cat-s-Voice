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

  // ฟังก์ชันยืนยันการลบสัตว์
  confirmDeny() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this animal?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deny();
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

  // โหลดข้อมูลการรับเลี้ยงแทนข้อมูลสัตว์
  loadAdoptionData(id: string) {
    this.adopterService.getAdoptionByAnimalId(id).subscribe(
      (response) => {
        this.data = response; // เซ็ตข้อมูลที่ได้จากการรับเลี้ยง
      },
      (error) => {
        console.error('Error fetching adoption data:', error);
      }
    );
  }

  // นำทางไปยังหน้าแก้ไขข้อมูลสัตว์
  navigateToEditData() {
    this.router.navigate(['/admin/findhome/edit-data/', this.animalId]);
  }

  // ฟังก์ชันลบสัตว์
  deny() {
    console.log('deny animal');
  }
}
