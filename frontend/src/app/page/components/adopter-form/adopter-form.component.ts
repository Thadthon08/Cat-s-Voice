import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdopterService } from '../../../services/adopter.service';
@Component({
  selector: 'app-adopter-form',
  templateUrl: './adopter-form.component.html',
  styleUrls: ['./adopter-form.component.css']
})
export class AdopterFormComponent implements OnInit{
  animalId: string | null = null;
  animals: any[] = []; 
  isModalOpen = false;
  modalImage = '';
  modalCaption = '';
  adopterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private animalService: AdopterService
  ) {
    this.adopterForm = this.fb.group({
      animal_id: [''],
      adopter_name: ['', Validators.required],
      adopter_email: ['', [Validators.required, Validators.email]],  
      adopter_phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      adopter_salary: [null, Validators.required],
      adoption_reason: [''],
      status: ['pending'],
    });
  }
  
  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id');
    if (this.animalId) {
      this.adopterForm.patchValue({
        animal_id: this.animalId
      });
    }
  }




  onSubmit() {
    if (this.adopterForm.valid) {
      const formData = this.adopterForm.value; // รับค่าจากฟอร์ม
      console.log('Form Data:', formData); // แสดงข้อมูลที่ส่ง
      
      this.animalService.addAdopter(formData).subscribe(
        (response) => {
          console.log('Adopter added successfully', response);
        },
        (error) => {
          console.error('Error adding adopter', error);
        }
      );
      this.isModalOpen = true;
    } else {
      console.log('Form is not valid');
      console.log(this.adopterForm.controls);
    }
    
    
  }


  Cancel(){
    this.router.navigate(['/find_home']);
  }



  closeModal(): void {
    this.isModalOpen = false;
  }

}
