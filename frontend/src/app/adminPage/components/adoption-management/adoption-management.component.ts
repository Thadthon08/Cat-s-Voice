import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../../services/animal.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-adoption-management',
  templateUrl: './adoption-management.component.html',
  styleUrl: './adoption-management.component.css',
})
export class AdoptionManagementComponent implements OnInit {
  animalId: string | null = null;
  data: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id');
    if (this.animalId) {
      this.loadAnimalData(this.animalId);
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this animal?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteAnimal();
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

  loadAnimalData(id: string) {
    this.animalService.getAnimalById(id).subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching animal data:', error);
      }
    );
  }

  navigateToEditData() {
    this.router.navigate(['/admin/findhome/edit-data/', this.animalId]);
  }

  deleteAnimal() {
    if (this.animalId) {
      this.animalService.delAnimalById(this.animalId).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Animal deleted successfully!',
            life: 3000,
          });
          setTimeout(() => this.router.navigate(['/admin/findhome']), 3000);
        },
        (error) => {
          console.error('Error deleting animal:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete animal.',
            life: 3000,
          });
        }
      );
    } else {
      console.error('Animal ID is null');
    }
  }
}
