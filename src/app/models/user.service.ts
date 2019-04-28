import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './user.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  get_user(url: string): Observable<User> {
    return this.http.get(url).pipe(map(res => new User(res['user']['firstname'],
      res['user']['lastname'], res['user']['email'], res['user']['telephone'],
      res['user']['postal_code'], res['user']['city'], res['user']['address1'], res['user']['building'])));
  }
}
