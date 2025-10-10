import { Routes } from '@angular/router';
import { LoginForm } from './iam/components/login-form/login-form';
import { SigninForm } from './iam/components/signin-form/signin-form';
import { UserLayout } from './iam/presentation/views/user-layout/user-layout';

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
  { path: '**', redirectTo: '' } // wildcard global al final
];

