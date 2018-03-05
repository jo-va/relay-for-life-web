import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.auth.user.switchMap(user => {
			if (user) {
				return Observable.of(true);
			} else {
				this.auth.redirectUrl = state.url;
				this.router.navigate(['/login']);
				return Observable.of(false);
			}
		});
	}
}