import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = 'http://localhost:5000/api/animals/upload';

  constructor(private http: HttpClient) {}

  addAnimal(animalData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, animalData);
  }
}
