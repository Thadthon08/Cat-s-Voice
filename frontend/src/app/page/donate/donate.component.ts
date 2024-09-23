import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DonationService } from '../../services/donation.service';
@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  isModalOpen: boolean = false;
  isValid: boolean = false;
  donationForm: FormGroup;
  isChecked = false; 
  showWarning = false; 

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private donationService: DonationService) {


    this.donationForm = this.fb.group({
      donor_firstname: ['', Validators.required],
      donor_lastname: ['', Validators.required],
      donor_email: ['', [Validators.required, Validators.email]],
      donor_phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      donation_date: [''],
      donation_amount: [null, Validators.required],
      donation_method: ['', Validators.required],
      additional_message: [''],
      acceptCheckbox: [false, Validators.requiredTrue]
    });


  }

  onSubmit() {

    if (this.donationForm.valid) {

      if (!this.donationForm.get('acceptCheckbox')?.value) {
        this.showWarning = true; 
      } else {
        this.showWarning = false; 
  
        const currentDate = new Date().toISOString().substring(0, 10); // รูปแบบ YYYY-MM-DD
        this.donationForm.patchValue({
          donation_date: currentDate
        });
  
        const formData = this.donationForm.value;
        this.donationService.addDonation(formData).subscribe(
          (response) => {
            this.isModalOpen = true;
            },
          (error) => {
            console.error('Error donating', error);
          }
        );
              }
    } else {
         this.isValid = true;
      setTimeout(() => {
        this.isValid = false;
      }, 3000);
    }
  }
  

  Cancel() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {

  }

  closeModal(): void {
    this.isModalOpen = false;
    setTimeout(() => {

      this.router.navigate(['/'])

    }, 2000);
  }
}
