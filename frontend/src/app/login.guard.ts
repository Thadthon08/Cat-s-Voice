import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class loginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (typeof window !== 'undefined' && localStorage) {
      const user = localStorage.getItem('user');

      if (user) {
        return this.router.parseUrl('/admin');
      }
    }

    return true;
  }
}
