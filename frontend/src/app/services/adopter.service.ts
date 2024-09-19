import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdopterService {
  private baseUrl = 'http://localhost:5000/api/adoption';

  constructor(private http: HttpClient) {}

  addAdopter(adopterData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/adoptions`, adopterData);
  }

  getAdoptionByAnimalId(animal_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/adoption/${animal_id}`);
  }

  updateAdoptionStatus(adoption_id: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${adoption_id}/status`, { status });
  }
}
