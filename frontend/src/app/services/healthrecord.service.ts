import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HealthRecordService {
  private apiUrl = 'http://localhost:5000/api/HealthRecord';

  constructor(private http: HttpClient) {}

  getHealthRecords(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getHealthRecordById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
