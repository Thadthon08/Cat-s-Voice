import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css'],
  providers: [MessageService], // ให้บริการ MessageService ในคอมโพเนนต์
})
export class ActivityEditComponent implements OnInit {
  activityId: string | null = null;
  activityForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.activityId = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
    if (this.activityId) {
      this.loadAnimalData(this.activityId);
    }
  }

  initializeForm(): void {
    this.activityForm = this.fb.group({
      name: [{ value: '' }],
      details: [{ value: '' }],
      location: [{ value: '' }],
      time: [''],
      notes: [''],
      date: [this.formatDate(new Date())],
      image: [{ value: '' }],
    });

    this.activityForm.valueChanges.subscribe((value) => {
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
    this.activityService.getActivityById(id).subscribe(
      (response) => {
        const data = {
          name: response.name,
          details: response.details,
          location: response.location,
          time: response.time,
          notes: response.notes,
          date: this.formatDate(new Date(response.date)),
          image: response.image,
        };

        this.activityForm.patchValue(data, { emitEvent: false });
      },
      (error) => {
        console.error('Error fetching animal data:', error);
      }
    );
  }

  onSubmit() {
    if (this.activityForm.valid && this.activityId) {
      this.activityService
        .editActivitById(this.activityId, this.activityForm.value)
        .subscribe(
          (response) => {
            console.log('Health record updated:', response);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'activity record updated successfully!',
              life: 3000,
            });
            setTimeout(() => this.location.back(), 3000); // นำทางกลับหลังจากแสดง toast
          },
          (error) => {
            console.error('Error updating activity record:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update activity record.',
              life: 3000,
            });
          }
        );
    }
  }

  onFormChange() {
    console.log('Form changed:', this.activityForm.value);
  }

  cancel(): void {
    this.location.back();
  }
  

}
