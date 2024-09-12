import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // URL ของ API สำหรับ Authentication

  constructor(private http: HttpClient) {}

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
    return !!user.token && !this.isTokenExpired();
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
  }
}
