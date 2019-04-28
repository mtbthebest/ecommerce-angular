import {Injectable, InjectionToken} from '@angular/core';

export const USER_TOKEN = new InjectionToken('user');

@Injectable()
export class User {
  constructor(public firstname, public lastname,
              public email, public telephone, public postal_code,
              public city, public address1, public building, public password?) {
  }

}
