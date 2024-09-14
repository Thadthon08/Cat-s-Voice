import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../../services/animal.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.css'],
})
export class EditAnimalComponent implements OnInit {
  animalId: string | null = null;
  animalForm: FormGroup;
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
    private animalService: AnimalService,
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
    console.log('Form Submitted', this.animalForm.value);
  }

  onFormChange() {
    console.log('Form changed:', this.animalForm.value);
  }

  onImageUpload(event: any) {
    // จัดการอัปโหลดไฟล์ที่นี่
    console.log('Image uploaded:', event.target.files[0]);
  }
}
