import {Injectable, InjectionToken} from '@angular/core';


export class Book {
  constructor(public title, public author, public description,
              public category, public img?) {
  }

}
