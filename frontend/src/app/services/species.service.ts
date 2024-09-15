import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private apiUrl = 'http://localhost:5000/api/species';

  constructor(private http: HttpClient) {}

  // ฟังก์ชันดึงข้อมูลสายพันธุ์สัตว์ทั้งหมดจาก API
  getSpecies(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
