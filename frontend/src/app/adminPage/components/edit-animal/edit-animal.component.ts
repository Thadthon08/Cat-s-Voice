import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../../services/animal.service';
import { SpeciesService } from '../../../services/species.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.css'],
  providers: [MessageService],
})
export class EditAnimalComponent implements OnInit {
  animalId: string | null = null;
  animalForm: FormGroup;
  speciesOptions: any[] = [];
  imageChanged: boolean = false;

  sizeOptions = [
    { label: 'เล็ก', value: 'Small' },
    { label: 'กลาง', value: 'Medium' },
    { label: 'ใหญ่', value: 'Large' },
  ];

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private speciesService: SpeciesService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private location: Location
  ) {
    this.animalForm = this.fb.group({
      name: [''],
      gender: [''],
      species: [''],
      age: [null],
      size: [''],
      color: [''],
      personality: [''],
      status: ['available'],
      image_url: [''],
    });

    this.animalForm.valueChanges.subscribe((value) => {
      this.onFormChange();
    });
  }

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id');
    if (this.animalId) {
      this.loadAnimalData(this.animalId);
    }
    this.loadSpeciesOptions();
  }

  loadSpeciesOptions() {
    this.speciesService.getSpecies().subscribe(
      (response) => {
        this.speciesOptions = response.map((species: any) => ({
          label: species.species_name,
          value: species.species_id,
        }));
        console.log('Species options loaded:', this.speciesOptions);
      },
      (error) => {
        console.error('Error fetching species options:', error);
      }
    );
  }

  loadAnimalData(id: string) {
    this.animalService.getAnimalById(id).subscribe(
      (response) => {
        this.animalForm.patchValue(response);
      },
      (error) => {
        console.error('Error fetching animal data:', error);
      }
    );
  }

  onSubmit() {
    if (this.animalForm.valid && this.animalId) {
      const formData = {
        ...this.animalForm.value,
        image_url: this.imageChanged
          ? this.animalForm.get('image_url')?.value
          : undefined,
      };

      this.animalService.editAnimalById(this.animalId, formData).subscribe(
        (response) => {
          console.log('Animal updated successfully:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Animal updated successfully!',
            life: 3000,
          });
          setTimeout(() => this.location.back(), 3000);
        },
        (error) => {
          console.error('Error updating animal:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update animal.',
            life: 3000,
          });
        }
      );
    } else {
      console.error('Form is not valid or Animal ID is missing');
    }
  }

  onFormChange() {
    console.log('Form changed:', this.animalForm.value);
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.animalForm.patchValue({ image_url: base64String });
        this.imageChanged = true;
        console.log('Image converted to base64:', base64String);
      };
      reader.readAsDataURL(file);
    }
  }
  onCancel() {
    this.location.back();
  }
}
