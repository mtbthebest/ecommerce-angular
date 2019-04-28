import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogged;

  constructor(private  cookies: CookieService) {
    this.isLogged = this.cookies.get('user_id') != '';
  }
}
