import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HealthRecordService } from '../../../services/healthrecord.service';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api'; // นำเข้า MessageService

@Component({
  selector: 'app-edit-recovery',
  templateUrl: './edit-recovery.component.html',
  styleUrls: ['./edit-recovery.component.css'],
  providers: [MessageService], // ให้บริการ MessageService ในคอมโพเนนต์
})
export class EditRecoveryComponent implements OnInit {
  animalId: string | null = null;
  animalForm!: FormGroup;

  sizeOptions = [
    { label: 'เล็ก', value: 'Small' },
    { label: 'กลาง', value: 'Medium' },
    { label: 'ใหญ่', value: 'Large' },
  ];

  constructor(
    private route: ActivatedRoute,
    private healthService: HealthRecordService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private messageService: MessageService 
  ) {}

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
    if (this.animalId) {
      this.loadAnimalData(this.animalId);
    }
  }

  // Initialize the form
  initializeForm(): void {
    this.animalForm = this.fb.group({
      name: [{ value: '' }],
      age: [{ value: null }],
      size: [{ value: '' }],
      diagnosis: [''],
      treatment: [''],
      notes: [''],
      checkup_date: [this.formatDate(new Date())],
      image_url: [{ value: '' }],
    });

    this.animalForm.valueChanges.subscribe((value) => {
      this.onFormChange();
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  loadAnimalData(id: string) {
    this.healthService.getHealthRecordById(id).subscribe(
      (response) => {
        const data = {
          name: response.animal_id.name,
          age: response.animal_id.age,
          size: response.animal_id.size,
          diagnosis: response.diagnosis,
          treatment: response.treatment,
          notes: response.notes,
          checkup_date: this.formatDate(new Date(response.checkup_date)),
          image_url: response.animal_id.image_url,
        };

        this.animalForm.patchValue(data, { emitEvent: false });
      },
      (error) => {
        console.error('Error fetching animal data:', error);
      }
    );
  }

  onSubmit() {
    if (this.animalForm.valid && this.animalId) {
      this.healthService
        .editHealthRecordById(this.animalId, this.animalForm.value)
        .subscribe(
          (response) => {
            console.log('Health record updated:', response);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Health record updated successfully!',
              life: 3000,
            });
            setTimeout(() => this.location.back(), 3000); // นำทางกลับหลังจากแสดง toast
          },
          (error) => {
            console.error('Error updating health record:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update health record.',
              life: 3000,
            });
          }
        );
    }
  }

  onFormChange() {
    console.log('Form changed:', this.animalForm.value);
  }

  cancel(): void {
    this.location.back();
  }
}
