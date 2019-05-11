import {Component, Inject, Input, OnInit} from '@angular/core';
import {User, USER_TOKEN} from '../../models/user.model';
import {Observable} from 'rxjs';
import {LoginService} from '../../models/login.service';
import {Book} from '../../models/book.model';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../models/cart.service';
import {Cart} from '../../models/cart.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  user: User;
  categories = [];
  books = new Array<Book>();
  category: string;
  isActive = 0;

  constructor(@Inject(USER_TOKEN) private user_service: Observable<User>,
              private login: LoginService, private actr: ActivatedRoute, private cart_service: CartService) {
    actr.data.value[0][0].books.forEach(book => this.books.push(new Book(book['id'], book['title'],
      book['author'], book['description'], book['category'], book['img'], book['price'])));
    actr.data.value[0][1].cart.forEach(book => {
      this.cart_service.cart.push(
        {
          book:
            new Book(book['id'], book['title'], book['author'], book['description'], book['category'], book['img'], book['price']),
          qty: book['qty']
        });
    });
    this.login.isLogged = true;
    this.isActive = 0;
    this.category = this.books[0].category;
    this.user_service.toPromise().then(user => {
      this.user = user;
    });


  }


  ngOnInit(): void {
  }

  get_category() {
    this.books.forEach((book) => {
        if (this.categories.indexOf(book.category) == -1) {
          this.categories.push(book.category);
        }
      }
    );
    return this.categories;
  }
}
