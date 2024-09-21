import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdopterService {
  private baseUrl = 'http://localhost:5000/api/adoption';

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

  addAdopter(adopterData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/adoptions`, adopterData);
  }

  getAdoptionByAnimalId(animal_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/adoption/${animal_id}`);
  }

  updateAdoptionStatus(adoption_id: string, status: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(
      `${this.baseUrl}/${adoption_id}/status`,
      { status },
      { headers }
    );
  }
}
