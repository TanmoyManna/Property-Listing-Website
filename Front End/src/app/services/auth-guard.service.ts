import { Injectable } from '@angular/core';
import { EventService } from '@project/services/event.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  isLoggedin:boolean;
  constructor(private router: Router,
    private event: EventService,) {
      this.event.isLogedin.subscribe((res: any) => {
        console.log("from auth guard",res);
        this.isLoggedin = res;
      });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |  Observable<boolean> {
    console.log("from auth guard",this.isLoggedin);
    if(!this.isLoggedin){
      this.router.navigate(['/home']);
    }
    return this.isLoggedin;
  }
}

