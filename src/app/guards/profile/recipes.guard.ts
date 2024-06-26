import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services';

@Injectable({
  providedIn: 'root'
})
export class RecipesGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.auth.checkPermissions({
        token: this.auth.getUser().token,
        code: '/recipes'
      })
      .catch(() => {
        this.router.navigate(['/dashboard']);
      })
    return true;
  }
  
}
