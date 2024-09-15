import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../../../services/animal.service';

@Component({
  selector: 'app-recovery-add-data',
  templateUrl: './recovery-add-data.component.html',
  styleUrl: './recovery-add-data.component.css',
})
export class RecoveryAddDataComponent {
  animalForm: FormGroup;
  speciesOptions = [
    { label: 'แมว', value: 1 },
    { label: 'หมา', value: 2 },
  ];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private animalService: AnimalService) {
    this.animalForm = this.fb.group({
      name: ['', Validators.required],
      checkup_date: [''],
      diagnosis: [''],
      treatment: [''],
      notes: [''],
    });
  }

  onSubmit() {
    // if (this.animalForm.valid) {
    //   const formData: FormData = new FormData();
    //   Object.keys(this.animalForm.controls).forEach((key) => {
    //     formData.append(key, this.animalForm.get(key)?.value);
    //   });

    //   if (this.selectedFile) {
    //     formData.append('image', this.selectedFile, this.selectedFile.name);
    //   }

    //   this.animalService.addAnimal(formData).subscribe(
    //     (response) => {
    //       console.log('Animal added successfully', response);
    //     },
    //     (error) => {
    //       console.error('Error adding animal', error);
    //     }
    //   );
    // } else {
    //   console.log('Form is not valid');
    // }

    console.log(this.animalForm.value);
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Uploaded file:', file);
    }
  }
}
