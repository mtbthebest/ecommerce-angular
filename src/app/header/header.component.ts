import {AfterContentChecked, AfterViewChecked, Component, Inject, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Input} from '@angular/core/src/metadata/directives';
import {LoginService} from '../models/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogged: boolean;

  constructor(private login: LoginService, private cookies: CookieService) {
  }

  logout() {
    this.cookies.delete('user_id');
    this.login.isLogged = false;
  }


}
