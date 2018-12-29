import {
    ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, NavigationExtras, Route, Router,
    RouterStateSnapshot
} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

import {LocalStoreManagerService} from '../services/local-store-manager.service';
import * as _ from 'lodash';
import {ROLE_ADMIN, ROLE_SUPER_ADMIN, ROLES} from '../fuse-config/global-const';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';


declare let ga: any;

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private localStoreManagerService: LocalStoreManagerService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLoginAndRole(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        const url = `/${route.path}`;
        return this.checkLoginAndRole(url);
    }

    checkLoginAndRole(url: string): boolean {
        const adminUser = this.localStoreManagerService.getData('adminUser');
        const accessToken = this.localStoreManagerService.getData('accessToken');
        if (!accessToken || !adminUser) {
            this.router.navigate(['/auth/login'], {queryParams: {returnUrl: url}});
            return false;
        }
        const roleSuperAdmin = adminUser.roles.find(role => role.name === ROLE_SUPER_ADMIN && role.games[0] === 1);
        // is role supper admin
        if (!roleSuperAdmin) {
            if (url.indexOf('settings/account') !== -1 && url !== '/settings/account/' + adminUser.id) {
                this.router.navigate(['']);
                return false;
            }
            if (url === '/admin-roles') {
                this.router.navigate(['']);
                return false;
            }
            // is role admin
            const roleAdmin = adminUser.roles.find(role => role.name === ROLE_ADMIN);
            if (!roleAdmin) {
                for (const ro of ROLES) {
                    if (url.indexOf(ro.url) !== -1) {
                        const checkRole = adminUser.roles.find(role => role.name === ro.role);
                        if (!checkRole) {
                            this.router.navigate(['']);
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
}
