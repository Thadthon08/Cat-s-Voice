import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../interface/IAnimal';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private baseUrl = 'http://localhost:5000/api/animals'; // URL หลักของ API

  constructor(private http: HttpClient) {}

  addAnimal(data: FormData): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // getAnimals(status?: string): Observable<any> {
  //   let params = new HttpParams();

  //   if (status) {
  //     params = params.set('status', status);
  //   }

  //   return this.http.get(this.baseUrl, { params });
  // }

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

    return this.http.get<any>(this.baseUrl, { params });
  }

  getAnimalsWithoutHealthRecord(): Observable<any> {
    return this.http.get(`${this.baseUrl}/without`);
  }

  getAnimalById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  editAnimalById(id: string, data: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delAnimalById(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
