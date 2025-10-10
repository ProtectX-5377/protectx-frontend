import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alert } from '../domain/model/alert.entity';

@Injectable({
  providedIn: 'root'
})
export class AlertsApi {
  private readonly baseUrl = 'http://localhost:3000/alerts';

  constructor(private http: HttpClient) {}

  getAllAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.baseUrl);
  }

  getAlertById(id: number): Observable<Alert> {
    return this.http.get<Alert>(`${this.baseUrl}/${id}`);
  }

  createAlert(alert: Alert): Observable<Alert> {
    return this.http.post<Alert>(this.baseUrl, alert);
  }

  updateAlert(alert: Alert): Observable<Alert> {
    return this.http.put<Alert>(`${this.baseUrl}/${alert.id}`, alert);
  }

  deleteAlert(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
