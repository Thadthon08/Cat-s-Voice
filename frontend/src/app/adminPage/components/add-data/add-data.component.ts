import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../../../services/animal.service';

@Injectable()
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
})
export class AddDataComponent {
  animalForm: FormGroup;
  speciesOptions = [
    { label: 'แมว', value: 1 },
    { label: 'หมา', value: 2 },
  ];

  constructor(private fb: FormBuilder, private animalService: AnimalService) {
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
      image: [null],
    });
  }

  onSubmit() {
    if (this.animalForm.valid) {
      console.log('Form Submitted!', this.animalForm.value);

      this.animalService.addAnimal(this.animalForm.value).subscribe(
        (response) => {
          console.log('Animal added successfully', response);
        },
        (error) => {
          console.error('Error adding animal', error);
        }
      );
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
