import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const isAdmin = isPlatformBrowser(platformId) && checkIfUserIsAdmin();

  if (!isAdmin) {
    router.navigate(['/admin/login']);
    return false;
  }

  return true;
};

function checkIfUserIsAdmin(): boolean {
  if (typeof window !== 'undefined' && localStorage) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user && user.role === 'admin';
  }
  return false;
}
