import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern('^[A-Z][a-zA-Z0-9]+$')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const user = {
        username: this.loginForm.value.username,
        role: 'admin',
      };
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Form Submitted!', this.loginForm.value);
      this.router.navigate(['/admin']);
    } else {
      console.log('Form is not valid');
    }
  }
}
