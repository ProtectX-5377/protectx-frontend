import { Injectable, signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs/operators';
import { Alert } from '../domain/model/alert.entity';
import { AlertsApi } from '../infrastructure/alerts-api';

@Injectable({
  providedIn: 'root'
})
export class AlertsStore {

  private alertsSignal = signal<Alert[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  readonly alerts = this.alertsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly alertCount = computed(() => this.alertsSignal().length);

  constructor(private alertsApi: AlertsApi) {
    this.loadAlerts();
  }

  loadAlerts() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.alertsApi.getAllAlerts()
      .pipe(
        retry(2),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (alerts) => {
          this.alertsSignal.set(alerts);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          console.error('Error loading alerts:', error);
          this.errorSignal.set('Error loading alerts');
          this.loadingSignal.set(false);
        }
      });
  }

  getAlertById(id: number) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.alertsApi.getAlertById(id)
      .pipe(
        retry(2),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (alert) => {
          this.loadingSignal.set(false);
        },
        error: (error) => {
          console.error('Error loading alert:', error);
          this.errorSignal.set('Error loading alert');
          this.loadingSignal.set(false);
        }
      });
  }

  createAlert(alert: Alert) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.alertsApi.createAlert(alert)
      .pipe(
        retry(2),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (newAlert) => {
          this.alertsSignal.update(alerts => [...alerts, newAlert]);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          console.error('Error creating alert:', error);
          this.errorSignal.set('Error creating alert');
          this.loadingSignal.set(false);
        }
      });
  }

  updateAlert(alert: Alert) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.alertsApi.updateAlert(alert)
      .pipe(
        retry(2),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (updatedAlert) => {
          this.alertsSignal.update(alerts =>
            alerts.map(a => a.id === alert.id ? updatedAlert : a)
          );
          this.loadingSignal.set(false);
        },
        error: (error) => {
          console.error('Error updating alert:', error);
          this.errorSignal.set('Error updating alert');
          this.loadingSignal.set(false);
        }
      });
  }

  deleteAlert(id: number) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.alertsApi.deleteAlert(id)
      .pipe(
        retry(2),
        takeUntilDestroyed()
      )
      .subscribe({
        next: () => {
          this.alertsSignal.update(alerts =>
            alerts.filter(a => a.id !== id)
          );
          this.loadingSignal.set(false);
        },
        error: (error) => {
          console.error('Error deleting alert:', error);
          this.errorSignal.set('Error deleting alert');
          this.loadingSignal.set(false);
        }
      });
  }
}
