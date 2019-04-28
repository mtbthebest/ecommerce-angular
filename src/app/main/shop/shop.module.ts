import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './cart/cart.component';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop.component';
import {ProfileComponent} from './profile/profile.component';
import {BookCategoryComponent} from './book-category/book-category.component';
import {BookService} from '../../models/books.service';
import {BookCardComponent} from './book-category/book-card/book-card.component';
import {CardColorDirective} from './book-category/card-color.directive';

const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: ShopComponent},
      {path: 'cart', component: CartComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  }

];


@NgModule({
  declarations: [CartComponent, ShopComponent, ProfileComponent, BookCategoryComponent, BookCardComponent, CardColorDirective],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class ShopModule {
}
