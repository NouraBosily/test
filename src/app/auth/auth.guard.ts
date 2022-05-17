import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { roleMatch } from '../shared/roleMatch.roles';
import { RolesService } from '../shared/roles.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  
  constructor(private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if (localStorage.getItem('token') != null)
     {
      let roles = next.data['permittedRoles'] as Array<string>;
      if(roles){
        if(roleMatch(roles)) return true;
        else{
         this.router.navigate(['/pages/forbidden']);
         return false;
        }
      }
      return true;
     }
    else {
      this.router.navigate(['/users/login']);
      return false;
    }
  }


/*
 constructor(private router:Router,private service:RolesService){

}
canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot):boolean {
    if (localStorage.getItem('token') != null)
   {

    let roles = next.data['permittedRoles'] as Array<string>;
  
    if(roles){
      this.service.getAuthGuard(roles).subscribe(res=>{
        if(res)
        {
         
        return true;
        }
        else
        {
         
        this.router.navigate(['/pages/forbidden']);
        return false;
        }
        
        })
    }
    return true;
   }
  else {
    this.router.navigate(['/users/login']);
    return false;
  }
}

*/
  
}

