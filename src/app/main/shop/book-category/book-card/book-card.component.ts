import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() books;
  @Input() category;

  constructor() {
  }

  ngOnInit() {
  }

  get_books_card() {
    return this.books.filter((book) => book.category == this.category);
  }

}
