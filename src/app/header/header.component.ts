import {AfterContentChecked, AfterViewChecked, Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Input} from '@angular/core/src/metadata/directives';
import {LoginService} from '../models/login.service';
import {CartService} from '../models/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges {
  isLogged: boolean;
  cartBooks: number;

  constructor(private login: LoginService, private cookies: CookieService, private cart_service: CartService) {
  }

  logout() {
    this.cookies.delete('user_id');
    this.login.isLogged = false;
  }

  getCartObject() {
    return this.cart_service.cart.length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }


}
