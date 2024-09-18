import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from '../../../services/activity.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Injectable()
@Component({
  selector: 'app-add-data-activity',
  templateUrl: './add-data-activity.component.html',
  styleUrls: ['./add-data-activity.component.css'],
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
export class ActivityAddDataComponent implements OnInit {
  activityForm: FormGroup;
  activitys: any[] = [];
  selectedFile: File | null = null;
  image: string = '';
  buttonState: string = 'default';

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private messageService: MessageService,
    private location: Location
  ) {
    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      date: [''],
      location: ['', Validators.required],
      time: [''],
      image: [''],
      notes: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    if (this.activityForm.valid) {
      this.activityForm.patchValue({ image: this.image });

      this.activityService.addactivity(this.activityForm.value).subscribe(
        (res) => {
          console.log('Response:', res);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Animal data added successfully!',
            life: 3000,
          });
          setTimeout(() => {
            this.location.back();
          }, 3000);
        },
        (error: any) => {
          console.error('Error adding animal', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add animal data.',
            life: 3000,
          });
        }
      );
    }
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();

      reader.onload = () => {
        this.image = reader.result as string;
        console.log('Base64 image:', this.image);
      };

      reader.readAsDataURL(file);
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
