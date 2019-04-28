import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './cart/cart.component';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop.component';
import {ProfileComponent} from './profile/profile.component';
import {BookCategoryComponent} from './book-category/book-category.component';
import {BookCardComponent} from './book-category/book-card/book-card.component';
import {CardColorDirective} from './book-category/card-color.directive';
import {BookDisplayComponent} from './cart/book-display/book-display.component';
import {FormsModule} from '@angular/forms';

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
  declarations: [CartComponent, ShopComponent, ProfileComponent, BookCategoryComponent, BookCardComponent,
    CardColorDirective,
    BookDisplayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers: []
})
export class ShopModule {
}
