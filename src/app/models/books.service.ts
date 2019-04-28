import {Injectable, Inject} from '@angular/core';
import {Book} from './book.model';

@Injectable()
export class BookService {
  books: Book[];
  // constructor(@Inject(BOOKS_SERVICE) private book_service){}
  // get_books() {
  //   this.book_service.subscribe(books => books.forEach((book) => books.push(
  //     new Book(book['title'], book['author'], book['description'], book['category'], book['url']))));
  //   return this.books;
  //
  //
  // }
}
