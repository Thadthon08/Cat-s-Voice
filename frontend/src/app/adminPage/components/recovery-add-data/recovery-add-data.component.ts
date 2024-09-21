import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../../../services/animal.service';
import { HealthRecordService } from '../../../services/healthrecord.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-recovery-add-data',
  templateUrl: './recovery-add-data.component.html',
  styleUrls: ['./recovery-add-data.component.css'],
  providers: [MessageService],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', animate('800ms ease-out')),
    ]),
    trigger('buttonHover', [
      state('default', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.05)' })),
      transition('default <=> hover', animate('300ms ease-in-out')),
    ]),
    trigger('zoomIn', [
      state('void', style({ transform: 'scale(0.5)', opacity: 0 })),
      state('*', style({ transform: 'scale(1)', opacity: 1 })),
      transition(':enter', animate('800ms ease-out')),
    ]),
  ],
})
export class RecoveryAddDataComponent implements OnInit {
  animalForm: FormGroup;
  animals: any[] = [];
  selectedFile: File | null = null;
  imageBase64: string = '';
  buttonState: string = 'default';

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private healthRecordService: HealthRecordService,
    private messageService: MessageService,
    private location: Location
  ) {
    this.animalForm = this.fb.group({
      animal_id: ['', Validators.required],
      checkup_date: [''],
      diagnosis: ['', Validators.required],
      treatment: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.loadAnimals();
  }

  loadAnimals() {
    this.animalService.getAnimalsWithoutHealthRecord().subscribe(
      (response) => {
        this.animals = response.map((animal: any) => ({
          name: animal.name,
          value: animal._id,
        }));
      },
      (error) => {
        console.error('Error fetching animals:', error);
      }
    );
  }

  onSubmit() {
    if (this.animalForm.valid) {
      const formData = {
        ...this.animalForm.value,
        animal_id: this.animalForm.value.animal_id.value,
      };

      this.healthRecordService.addHealthRecord(formData).subscribe(
        (res) => {
          console.log('Health record added:', res);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Health record added successfully!',
            life: 3000,
          });
          setTimeout(() => {
            this.location.back();
          }, 3000);
        },
        (error) => {
          console.error('Error adding health record:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add health record.',
            life: 3000,
          });
        }
      );
    }
  }
  onMouseEnter() {
    this.buttonState = 'hover';
  }

  onMouseLeave() {
    this.buttonState = 'default';
  }

  onCancel() {
    this.location.back();
  }
}
