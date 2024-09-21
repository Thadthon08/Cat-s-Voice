import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private baseUrl = 'http://localhost:5000/api/animals';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : null;

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    if (this.authService.isTokenExpired()) {
      console.log('Token has expired');
      this.authService.logout();
      throw new Error('Token has expired');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  addAnimal(data: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl, data, { headers });
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
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/${id}`, data, { headers });
  }

  delAnimalById(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  getAnimalBySpecie(species: number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/species/${species}`);
  }

  getAnimalByGender(gender: string | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/gender/${gender}`);
  }

  getAnimalBySpecieGender(
    species: number | null,
    gender: string | null
  ): Observable<any> {
    return this.http.get(`${this.baseUrl}/species/${species}/gender/${gender}`);
  }
}
