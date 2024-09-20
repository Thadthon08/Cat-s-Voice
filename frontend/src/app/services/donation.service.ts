import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private baseUrl = 'http://localhost:5000/api/donations';

  constructor(private http: HttpClient) { }

  addDonation( donateData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/donations`, donateData);
  }
}
