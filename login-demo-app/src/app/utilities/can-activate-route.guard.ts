import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { appConstants } from './appConstants';

/**
 * Route guard to prevent access to other pages
 * before login.
 */
@Injectable()
export class CanActivateRouteGuard implements CanActivate {

    constructor(private localStorageService: LocalStorageService) { }
    /**
     * Function of CanActivate interface to check if routing is
     * allowed or not.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // Username gets stored after login only and is cleared on logout.
        if (this.localStorageService.get(appConstants.USERNAME_KEY)) {
            return true;
        }
        return false;
    }
}
