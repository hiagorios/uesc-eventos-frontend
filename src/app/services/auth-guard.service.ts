import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthenticated: boolean = route.data.isAuthenticated;
    const hasPermission = route.data.hasPermission;
    const hasAnyPermission: string[] = route.data.hasAnyPermission;
    const hasAllPermissions: string[] = route.data.hasAllPermissions;

    let permission = false;

    if (isAuthenticated !== undefined) {
        return this.handlerIsAuthenticated(isAuthenticated);
    }

    if (hasPermission) {
      permission = this.handlerHasPermission(hasPermission);
    }

    if (hasAnyPermission) {
      permission = this.handlerHasAnyPermission(hasAnyPermission);
    }

    if (hasAllPermissions) {
      permission = this.handlerHasAllPermissions(hasAllPermissions);
    }

    if (!permission) {
      this.router.navigate([environment.loginPage]);
      return false;
    }

    return permission;
  }

  handlerIsAuthenticated(isAuthenticated: boolean): boolean {
    return this.auth.isAuthenticated() === isAuthenticated;
  }

  handlerHasPermission(permission: string): boolean {
    return this.hasPermission(permission);
  }

  handlerHasAnyPermission(permissions: string[]): boolean {
    for (const a of permissions) {
      if (this.hasPermission(a)) {
        return true;
      }
    }
    return false;
  }

  handlerHasAllPermissions(permissions: string[]): boolean {
    for (const a of permissions) {
      if (!this.hasPermission(a)) {
        return false;
      }
    }
    return true;
  }

  hasPermission(permission: string): boolean {
    return this.auth.isAuthenticated() && this.auth.hasPermission(permission);
  }

}
