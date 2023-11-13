import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

export class AuthGuardService {
  constructor(private userAuthService: UserAuthService, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userAuthService.isLoggedIn()) { 
      return true;
    } else {
      this.router.navigate(['']); 
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authGuardService = new AuthGuardService(new UserAuthService(), new Router(),); 
  return authGuardService.canActivate();
};


