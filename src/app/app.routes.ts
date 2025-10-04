import { Routes } from '@angular/router';
import { LoginForm } from './iam/components/login-form/login-form';

export const routes: Routes = [
    {path: '', component: LoginForm },
    {path: '**', redirectTo: ''    },
];
