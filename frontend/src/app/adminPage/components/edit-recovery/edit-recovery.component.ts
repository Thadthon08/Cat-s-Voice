import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HealthRecordService } from '../../../services/healthrecord.service';

@Component({
  selector: 'app-edit-recovery',
  templateUrl: './edit-recovery.component.html',
  styleUrls: ['./edit-recovery.component.css'],
})
export class EditRecoveryComponent implements OnInit {
  animalId: string | null = null;
  animalForm!: FormGroup;
  speciesOptions = [
    { label: 'แมว', value: 1 },
    { label: 'หมา', value: 2 },
  ];

  sizeOptions = [
    { label: 'เล็ก', value: 'Small' },
    { label: 'กลาง', value: 'Medium' },
    { label: 'ใหญ่', value: 'Large' },
  ];

  constructor(
    private route: ActivatedRoute,
    private healthService: HealthRecordService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id');
    this.initializeForm(); // Initialize the form in ngOnInit
    if (this.animalId) {
      this.loadAnimalData(this.animalId);
    }
  }

  // Initialize the form
  initializeForm(): void {
    this.animalForm = this.fb.group({
      name: [{ value: '' }],
      gender: [{ value: '' }],
      species: [{ value: '' }],
      age: [{ value: null }],
      size: [{ value: '' }],
      color: [{ value: '' }],
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

  // Format the date for type="date"
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Load animal data by ID
  loadAnimalData(id: string) {
    this.healthService.getHealthRecordById(id).subscribe(
      (response) => {
        const data = {
          name: response.animal_id.name,
          gender: response.animal_id.gender,
          species: response.animal_id.species,
          age: response.animal_id.age,
          size: response.animal_id.size,
          color: response.animal_id.color,
          diagnosis: response.diagnosis,
          treatment: response.treatment,
          notes: response.notes,
          checkup_date: this.formatDate(new Date(response.checkup_date)), // Ensure date is formatted correctly
          image_url: response.animal_id.image_url,
        };

        // Use patchValue to set values including the disabled ones
        this.animalForm.patchValue(data, { emitEvent: false });
      },
      (error) => {
        console.error('Error fetching animal data:', error);
      }
    );
  }

  onSubmit() {
    console.log('Form Submitted', this.animalForm.value);
    // Add logic to save the updated data
  }

  onFormChange() {
    console.log('Form changed:', this.animalForm.value);
  }

  onImageUpload(event: any) {
    // Handle image upload
    const file = event.target.files[0];
    if (file) {
      console.log('Image uploaded:', file);
      // Further processing of the file can be done here
    }
  }

  cancel(): void {
    this.router.navigate(['/']); // Adjust the path to where you want to redirect the user
  }
}
