import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAdmin = checkIfUserIsAdmin();

  if (!isAdmin) {
    router.navigate(['/admin/login']);
    return false;
  }

  return true;
};

function checkIfUserIsAdmin(): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user && user.role === 'admin';
}
