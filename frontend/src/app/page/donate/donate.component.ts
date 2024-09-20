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
  // animalId: string | null = null;
  isModalOpen = false;

  donationForm: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute , private donationService:DonationService) {


    this.donationForm = this.fb.group({
      donor_firstname: ['', Validators.required],
      donor_lastname: ['', Validators.required],
      donor_email: ['', [Validators.required, Validators.email]],
      donor_phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      donation_date:[''],
      donation_amount: [null, Validators.required],
      donation_method: ['', Validators.required],
      additional_message: [''],
    });


  }

  onSubmit() {
    if (this.donationForm.valid) {
      const currentDate = new Date().toISOString().substring(0, 10); // รูปแบบ YYYY-MM-DD
      this.donationForm.patchValue({
        donation_date: currentDate
      });
      const formData = this.donationForm.value
      this.donationService.addDonation(formData).subscribe(
        (response) => {
          console.log('Donate added successfully', response);
        },
        (error) => {
          console.error('Error donating', error);
        }
      );
      this.isModalOpen = true;
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
    // this.animalId = this.route.snapshot.paramMap.get('id');
  }

  closeModal(): void {
    this.isModalOpen = false;
    setTimeout(() => {
      
      this.router.navigate(['/'])
     
    }, 2000);
  }
}
