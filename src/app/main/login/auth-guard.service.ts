import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CanActivate, Resolve, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

import {BACKEND_URL} from '../../app.module';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate, Resolve<any> {

  constructor(private cookies: CookieService, private router: Router,
              @Inject('url') private url, private http: HttpClient
  ) {
  }

  canActivate() {
    if (this.cookies.get('user_id') == '') {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;

  }

  resolve(): Observable<any> | Promise<any> | any {
    let user_id = this.cookies.get('user_id');
    return forkJoin([this.http.get(`${BACKEND_URL}/books`),
      this.http.get(`${BACKEND_URL}/cart/${user_id}`)
    ]);
  }
}
