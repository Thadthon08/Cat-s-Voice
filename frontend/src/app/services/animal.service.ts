import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private baseUrl = 'http://localhost:5000/api/animals'; // URL หลักของ API

  constructor(private http: HttpClient) {}

  addAnimal(animalData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, animalData);
  }

  getAnimals(status?: string): Observable<any> {
    let params = new HttpParams();

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get(this.baseUrl, { params });
  }

  getAnimalById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
