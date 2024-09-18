import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl = 'http://localhost:5000/api/activities';

  constructor(private http: HttpClient) {}

  addactivity(data: FormData): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getActivity(
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

  getActivityById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  editActivitById(id: string, data: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delActivitById(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}




