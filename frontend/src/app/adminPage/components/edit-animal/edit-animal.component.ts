import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../../services/animal.service';
import { SpeciesService } from '../../../services/species.service'; // Import the SpeciesService
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.css'],
})
export class EditAnimalComponent implements OnInit {
  animalId: string | null = null;
  animalForm: FormGroup;
  speciesOptions: any[] = []; // Initialize as an empty array to be filled with data from the service

  sizeOptions = [
    { label: 'เล็ก', value: 'Small' },
    { label: 'กลาง', value: 'Medium' },
    { label: 'ใหญ่', value: 'Large' },
  ];

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private speciesService: SpeciesService, // Inject the SpeciesService
    private fb: FormBuilder
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
    this.loadSpeciesOptions(); // Load species options when component initializes
  }

  loadSpeciesOptions() {
    this.speciesService.getSpecies().subscribe(
      (response) => {
        this.speciesOptions = response.map((species: any) => ({
          label: species.species_name, // Display name of the species
          value: species.species_id, // ObjectId or unique ID for the species
        }));
        console.log('Species options loaded:', this.speciesOptions); // ตรวจสอบข้อมูลที่ดึงมา
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
      this.animalService
        .editAnimalById(this.animalId, this.animalForm.value)
        .subscribe(
          (response) => {
            console.log('Animal updated successfully:', response);
          },
          (error) => {
            console.error('Error updating animal:', error);
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
    console.log('Image uploaded:', event.target.files[0]);
  }
}
