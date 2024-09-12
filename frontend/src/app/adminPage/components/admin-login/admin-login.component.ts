import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  providers: [MessageService],
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.authService.login(loginData).subscribe(
        (response) => {
          console.log('Login successful', response);

          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: 'You have logged in successfully!',
          });

          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Login failed', error);

          let errorMessage = 'Invalid credentials. Please try again.';
          if (error.status === 401) {
            errorMessage =
              'Unauthorized access. Please check your credentials.';
          } else if (error.status === 0) {
            errorMessage =
              'Network error. Please check your internet connection.';
          } else if (error.status >= 500) {
            errorMessage = 'Server error. Please try again later.';
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: errorMessage,
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Form Invalid',
        detail: 'Please fill out all required fields correctly.',
      });
    }
  }
}
