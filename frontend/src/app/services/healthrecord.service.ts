import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class HealthRecordService {
  private apiUrl = 'http://localhost:5000/api/HealthRecord';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : null;

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    if (this.authService.isTokenExpired()) {
      console.log('Token has expired');
      this.authService.logout();
      throw new Error('Token has expired');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  addHealthRecord(data: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl, data, { headers });
  }

  getHealthRecords(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getHealthRecordById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  editHealthRecordById(id: string, data: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers });
  }

  deleteHealthRecordById(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
