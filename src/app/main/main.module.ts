import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {routes} from './app.routing';
import {SignupComponent} from './signup/signup.component';
import {HttpClient} from '@angular/common/http';
import {USER_TOKEN} from '../models/user.model';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../models/user.service';
import {AuthGuardService} from './login/auth-guard.service';
import {LoginService} from '../models/login.service';
import {BACKEND_URL, BOOKS_SERVICE} from '../app.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [LoginComponent],
  providers: [CookieService,
    {provide: AuthGuardService, useClass: AuthGuardService},
    {provide: LoginService, useClass: LoginService},
    // {provide: BOOKS_SERVICE,
    //   deps: [HttpClient],
    //   useFactory: function (http: HttpClient) {
    //     let books = new Array<Book>();
    //     let book_service =  http.get(`${BACKEND_URL}/books`).pipe(map(res => {
    //       return res['books']
    //         // res['books'].forEach((book) => books.push(
    //         //   new Book(book['title'], book['author'], book['description'], book['category'], book['url'])
    //       // ));
    //     }));
    //     return book_service;
    //   }
    // },

    {
      provide: USER_TOKEN,
      deps: [CookieService, HttpClient],
      useFactory: (cookies, http) => {
        let id = cookies.get('user_id');
        let req = new UserService(http);

        return req.get_user(`${BACKEND_URL}/user/${id}`);
      }
    }
  ]
})
export class MainModule {
}

