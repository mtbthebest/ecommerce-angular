import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {MainModule} from './main/main.module';
import {HomeComponent} from './home/home.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {Book} from './models/book.model';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CartService} from './models/cart.service';

export let BACKEND_URL = 'http://localhost:5000';
export let BOOKS_SERVICE = new InjectionToken('books');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchBarComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    MainModule, HttpClientModule
  ],
  providers: [

    {provide: 'url', useValue: BACKEND_URL},
    CartService

  ],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
