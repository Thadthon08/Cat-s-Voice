import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
  animalId: string | null = null;
  isModalOpen = false;

  donationForm: FormGroup;
  fullnameForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.fullnameForm = this.fb.group({
      firstname: [''],
      lastname: [''],
    });

    this.donationForm = this.fb.group({
      name: ['', Validators.required],
      donation_amount: [null, Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      donate_method: ['', Validators.required],
      additional_message: [''],
    });

    // Subscribe to changes in fullnameForm and update donationForm
    this.fullnameForm.valueChanges.subscribe(values => {
      const fullName = `${values.firstname} ${values.lastname}`;
      this.donationForm.patchValue({ name: fullName });
    });
  }

  onSubmit() {
    if (this.donationForm.valid) {
      console.log('Form Submitted!', this.donationForm.value);
    } else {
      console.log('Form is not valid', this.donationForm.value);
    }
    this.isModalOpen = true;
  }

  Cancel() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id');
  }

  closeModal(): void {
    this.isModalOpen = false;
    setTimeout(() => {
      
      this.router.navigate(['/'])
     
    }, 2000);
  }
}
