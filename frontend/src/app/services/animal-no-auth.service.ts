import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AnimalNoAuthService {
  private apiUrl = 'http://localhost:5000/api/animals';

  constructor(private http: HttpClient) {}

  getAnimals(
    status?: string,
    limit: number = 10,
    page: number = 1
  ): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());

    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<any>(this.apiUrl);
  }
  

  getAnimalById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAnimalBySpecieAge(species: number | null , age: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/species/${species}/age/${age}`);
  }
  
  getAnimalByGenderAge(gender: string | null , age : string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/gender/${gender}/age/${age}`);
  }
  
  getAnimalBySpecieGenderAge(
    species: number | null,
    gender: string | null,
    age : string | null
  ): Observable<any> {
    return this.http.get(`${this.apiUrl}/species/${species}/gender/${gender}/age/${age}`);
  }
  
}
