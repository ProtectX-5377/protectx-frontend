import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check if user is logged in (has user data in localStorage)
  const userData = localStorage.getItem('user');

  if (userData) {
    // User is authenticated
    return true;
  }

  // User is not authenticated, redirect to login
  router.navigate(['/login']);
  return false;
};
