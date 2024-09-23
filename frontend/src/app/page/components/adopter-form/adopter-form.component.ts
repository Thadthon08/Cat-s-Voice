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
  isModalOpen: boolean = false;
  modalImage = '';
  modalCaption = '';
  adopterForm: FormGroup;
  isValid: boolean = false;

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
      adoption_date:[''],
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
    console.log( this.adopterForm.get('adopter_phone') )
    if (this.adopterForm.valid) {
      const currentDate = new Date().toISOString().substring(0, 10); // รูปแบบ YYYY-MM-DD
      this.adopterForm.patchValue({
        adoption_date: currentDate
      });
      const formData = this.adopterForm.value; 
      this.animalService.addAdopter(formData).subscribe(
        (response) => {
          this.isModalOpen = true;
          setTimeout(() => {
            window.location.reload();
            }, 4000);
        },
        (error) => {
          console.error('Error adding adopter', error);
        }
      );
      
    } else {
      this.isValid = true;
      setTimeout(() => {
      this.isValid = false;
      }, 4000);
    }
    
    
  }


  Cancel(){
    this.router.navigate(['/find_home']);
  }



  closeModal(): void {
    this.isModalOpen = false;
  }

}
