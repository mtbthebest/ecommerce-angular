import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from '../home/home.component';
import {AuthGuardService} from './login/auth-guard.service';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', component: HomeComponent},
  {
    path: 'shop', canActivate: [AuthGuardService], resolve: [AuthGuardService],
    loadChildren: './shop/shop.module#ShopModule'
  }
];
