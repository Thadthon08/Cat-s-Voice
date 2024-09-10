import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../interface/IAnimal';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = 'http://localhost:5000/api/animals'; // URL ของ API

  constructor(private http: HttpClient) {}

  // ฟังก์ชันเพิ่มสัตว์ใหม่
  addAnimal(animalData: Animal): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, animalData, { headers });
  }
}
