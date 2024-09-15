import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-edit-animal',
  templateUrl: './form-edit-animal.component.html',
  styleUrls: ['./form-edit-animal.component.css'],
})
export class FormEditAnimalComponent implements OnChanges {
  @Input() data: any;
  animalForm: FormGroup;

  speciesMapping: { [key: number]: string } = {
    1: 'Cat',
    2: 'Dog',
  };

  constructor(private fb: FormBuilder) {
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.animalForm.patchValue(this.data);

      this.mapSpeciesLabel();
    }
  }

  mapSpeciesLabel(): void {
    const speciesValue = this.animalForm.get('species')?.value;
    const mappedLabel = this.speciesMapping[speciesValue];
    this.animalForm.get('species')?.setValue(mappedLabel);
  }
}
