import { Routes } from '@angular/router';
import { LoginForm } from './iam/components/login-form/login-form';
import { SigninForm } from './iam/components/signin-form/signin-form';
import { UserLayout } from './iam/presentation/views/user-layout/user-layout';
import { HomeComponent } from './public/presentation/views/home-component/home-component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: UserLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta vacía predeterminada
      { path: 'login', component: LoginForm },
      { path: 'signin', component: SigninForm },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [authGuard]
  },
  {
    path: 'cameras',
    loadComponent: () => import('./cameras/presentation/views/cameras-dashboard/cameras-dashboard.component')
      .then(c => c.CamerasDashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'cameras/:id/config',
    loadComponent: () => import('./cameras/presentation/views/camera-settings/camera-settings.component')
      .then(c => c.CameraSettingsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'alerts',
    loadComponent: () => import('./alerts/presentation/views/alerts-dashboard/alerts-dashboard.component')
      .then(c => c.AlertsDashboardComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' } // wildcard global al final
];
