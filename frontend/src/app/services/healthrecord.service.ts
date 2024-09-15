import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HealthRecordService {
  private apiUrl = 'http://localhost:5000/api/HealthRecord';

  constructor(private http: HttpClient) {}

  addHealthRecord(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getHealthRecords(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getHealthRecordById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  editHealthRecordById(id: string, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteHealthRecordById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
