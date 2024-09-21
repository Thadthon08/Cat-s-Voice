import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router'; // ใช้ Router สำหรับการรีไดเรกต์

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; 

  constructor(private http: HttpClient, private router: Router) {} 

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      map((response: any) => {
        if (response && response.token && response.admin_id) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              email: loginData.email,
              role: 'admin',
              token: response.token,
              admin_id: response.admin_id,
            })
          );
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!!user.token && !this.isTokenExpired()) {
      return true;
    } else {
      this.logout();
      this.router.navigate(['/admin/login']);
      return false;
    }
  }

  isTokenExpired(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.token) {
      return true;
    }

    try {
      const tokenParts = user.token.split('.');
      if (tokenParts.length !== 3) {
        return true;
      }

      const payload = JSON.parse(atob(tokenParts[1]));
      const expiry = payload.exp;

      if (!expiry) {
        return true;
      }

      const currentTime = Math.floor(new Date().getTime() / 1000);
      return currentTime >= expiry;
    } catch (e) {
      console.error('Invalid token:', e);
      return true;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/admin/login']);
  }
}
