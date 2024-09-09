import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
})
export class AddDataComponent {
  animalForm: FormGroup;
  speciesOptions = [
    { label: 'แมว', value: 'cat' },
    { label: 'หมา', value: 'dog' },
  ];

  constructor(private fb: FormBuilder) {
    this.animalForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      species: ['', Validators.required],
      age: [null, Validators.required],
      color: [''],
      personality: [''],
      symptoms: [''],
      image: [null],
    });
  }

  onSubmit() {
    if (this.animalForm.valid) {
      console.log('Form Submitted!', this.animalForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    if (file) {
      this.animalForm.patchValue({ image: file });
      console.log('Uploaded file:', file);
    }
  }
}
