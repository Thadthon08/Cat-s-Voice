import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  providers: [MessageService], // Provide MessageService
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService // Inject MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.http
        .post('http://localhost:5000/api/admin/login', loginData)
        .subscribe(
          (response) => {
            console.log('Login successful', response);

            const user = {
              email: loginData.email,
              role: 'admin',
            };
            localStorage.setItem('user', JSON.stringify(user));

            this.messageService.add({
              severity: 'success',
              summary: 'Login Successful',
              detail: 'You have logged in successfully!',
            });

            this.router.navigate(['/admin']);
          },
          (error) => {
            console.error('Login failed', error);

            this.messageService.add({
              severity: 'error',
              summary: 'Login Failed',
              detail: 'Invalid credentials. Please try again.',
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
