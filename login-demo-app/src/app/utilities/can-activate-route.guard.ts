import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { appConstants } from './appConstants';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.localStorageService.get(appConstants.USERNAME_KEY)) {
        return true;
      }
      return false;
  }
}
