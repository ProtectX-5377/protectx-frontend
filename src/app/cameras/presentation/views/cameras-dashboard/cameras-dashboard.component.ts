import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';  // <-- added
import { CamerasStore } from '../../../application/cameras-store';
import { Camera } from '../../../domain/model/camera.entity';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cameras-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, FormsModule],  // added FormsModule
  templateUrl: './cameras-dashboard.component.html',
  styleUrls: ['./cameras-dashboard.component.css']
})
export class CamerasDashboardComponent {
  cameras;
  loading;

  // 👇 NEW: toggle form visibility control
  formVisible = signal(false);

  // 👇 NEW: new camera form model (omit id which is usually generated)
  newCameraForm = signal<Omit<Camera, 'id'>>({
    name: '',
    status: 'offline',
    resolution: 'high',
    nightVision: false,
    motionDetection: false,
    lastRecording: undefined,
    location: '',
    streamUrl: ''
  });

  constructor(private camerasStore: CamerasStore) {
    this.cameras = this.camerasStore.cameras;
    this.loading = this.camerasStore.loading;
  }

  toggleForm(): void {
    this.formVisible.update(v => !v);
  }

  submitForm(): void {
    const payload = this.newCameraForm();

    // Basic validation
    if (!payload.name) {
      alert('[translate:El nombre es obligatorio]');
      return;
    }

    // Add new camera via store
    this.camerasStore.addCamera(payload as Camera);

    // Reset form for next use
    this.newCameraForm.set({
      name: '',
      status: 'offline',
      resolution: 'high',
      nightVision: false,
      motionDetection: false,
      lastRecording: undefined,
      location: '',
      streamUrl: ''
    });

    this.formVisible.set(false);
  }

  getStatusIcon(camera: Camera): string {
    switch (camera.status) {
      case 'online': return '🟢';
      case 'recording': return '🔴';
      case 'offline': return '⚫';
      default: return '⚫';
    }
  }
}
