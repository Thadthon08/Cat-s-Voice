import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../../../services/animal.service';
import { SpeciesService } from '../../../services/species.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';

@Injectable()
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
  providers: [MessageService],
})
export class AddDataComponent implements OnInit {
  animalForm: FormGroup;
  speciesOptions: any[] = [];
  selectedFile: File | null = null;
  image_url: string = '';

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private speciesService: SpeciesService,
    private messageService: MessageService,
    private location: Location
  ) {
    this.animalForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      species: ['', Validators.required],
      age: [null, Validators.required],
      size: ['', Validators.required],
      color: [''],
      personality: [''],
      symptoms: [''],
      status: ['available'],
      added_by_admin_id: [1],
      image_url: [''],
    });
  }

  ngOnInit(): void {
    this.loadSpeciesOptions();
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
}
