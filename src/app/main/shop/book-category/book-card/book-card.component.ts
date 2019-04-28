import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../../../models/cart.service';
import {HttpClient} from '@angular/common/http';
import {BACKEND_URL} from '../../../../app.module';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() books;
  @Input() category;
  user_id: number;

  constructor(private cart_service: CartService, private http: HttpClient, private cookies: CookieService) {
    this.user_id = Number(cookies.get('user_id'));
  }

  ngOnInit() {
  }

  get_books_card() {
    return this.books.filter((book) => book.category == this.category);
  }

  addToCart(book) {
    this.cart_service.cart.push({
      book: book,
      qty: 1
    });
    // this.http.post(`${BACKEND_URL}/cart/${this.user_id}`, {'book_id': book.id}).subscribe(res => console.log(res));
  }

  deleteFromCart(book) {
    // this.cart_service.cart.splice(this.cart_service.cart.indexOf(book));
    console.log(book);
    this.cart_service.cart.splice(
      this.cart_service.cart.indexOf(
        this.cart_service.cart.filter(cart => cart.book.id == book.id)[0]
      )
    );
  }

  InCart(book) {
    return this.cart_service.cart.filter((cart) => cart.book.id == book.id).length > 0;
  }

}
