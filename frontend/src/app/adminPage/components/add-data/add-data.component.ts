import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../../../services/animal.service';
import { SpeciesService } from '../../../services/species.service';
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
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
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
export class AddDataComponent implements OnInit {
  animalForm: FormGroup;
  speciesOptions: any[] = [];
  selectedFile: File | null = null;
  image_url: string = '';
  buttonState: string = 'default';
  admin_id: number | null = null; // เก็บค่า admin_id

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private speciesService: SpeciesService,
    private messageService: MessageService,
    private location: Location
  ) {
    this.animalForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      species: [null, Validators.required],
      age: [null, [Validators.required, Validators.min(1), Validators.max(20)]],
      size: ['', Validators.required],
      color: [''],
      personality: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      status: ['available'],
      added_by_admin_id: [null, Validators.required],
      image_url: [''],
    });
  }

  ngOnInit(): void {
    this.loadSpeciesOptions();
    this.loadAdminIdFromLocalStorage();
  }

  loadSpeciesOptions() {
    this.speciesService.getSpecies().subscribe(
      (response) => {
        this.speciesOptions = response.map((species: any) => ({
          label: species.species_name,
          value: species.species_id,
        }));
      },
      (error) => {
        console.error('Error fetching species options:', error);
      }
    );
  }

  loadAdminIdFromLocalStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.admin_id = userData.admin_id || null;
      if (this.admin_id) {
        this.animalForm.patchValue({ added_by_admin_id: this.admin_id });
      }
    }
  }

  onSubmit() {
    if (this.animalForm.valid) {
      this.animalForm.patchValue({ image_url: this.image_url });

      this.animalService.addAnimal(this.animalForm.value).subscribe(
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
        (error) => {
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
        this.image_url = reader.result as string;
        console.log('Base64 image:', this.image_url);
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

  cancel() {
    this.location.back();
  }
}
