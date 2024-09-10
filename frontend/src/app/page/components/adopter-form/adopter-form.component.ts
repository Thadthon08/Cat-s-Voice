import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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


  constructor(private fb: FormBuilder ,private router:Router ,private route: ActivatedRoute) {
    this.adopterForm = this.fb.group({
      name: ['', Validators.required],
      salary: [null, Validators.required],
      phone: ['', [Validators.required,Validators.pattern('[0-9]{10}')]],
      email: ['',[Validators.required,Validators.email]],
      reason: ['', Validators.required],

    });
  }

  onSubmit() {

    if (this.adopterForm.valid) {
      console.log('Form Submitted!', this.adopterForm.value);
    } else {
      console.log('Form is not valid', this.adopterForm.value);
    }
    this.isModalOpen = true;
  }


  Cancel(){
    this.router.navigate(['/find_home']);
  }

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id');
  }


  closeModal(): void {
    this.isModalOpen = false;
  }

}
