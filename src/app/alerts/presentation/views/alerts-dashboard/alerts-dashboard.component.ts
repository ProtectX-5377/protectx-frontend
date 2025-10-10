import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { NavbarComponent } from '../../../../shared/components/navbar-component/navbar-component';
import { AlertsStore } from '../../../application/alerts-store';

@Component({
  selector: 'app-alerts-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe, NavbarComponent],
  templateUrl: './alerts-dashboard.component.html',
  styleUrl: './alerts-dashboard.component.css'
})
export class AlertsDashboardComponent {

  constructor(public alertsStore: AlertsStore) {}

  getAlertIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'motion': '🚨',
      'smoke': '🔥',
      'battery': '🪫',
      'vibration': '⚡'
    };
    return icons[type] || '🔔';
  }
}
