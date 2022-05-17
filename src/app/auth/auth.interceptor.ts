import { HttpInterceptor } from '@angular/common/http';
import{HttpRequest,HttpHandler,HttpEvent} from '@angular/common/http';
import{Observable} from'rxjs'
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class Auth implements HttpInterceptor {
    constructor(private router:Router){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        if (err.status == 401){
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/users/login');
                        }
                        if(err.status==403  ){
                       this.router.navigateByUrl('/pages/forbidden');
                        }
                    }
                )
            )
        }
        else
            return next.handle(req.clone());
    }
}
