import {Injectable} from '@angular/core';
import {Cart} from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart[];

  constructor() {
    this.cart = new Array<Cart>();
    // this.cart = new Array();
    // this.cart = new Object({'book': new Array<Book>(), 'qty': 0});
  }
}
