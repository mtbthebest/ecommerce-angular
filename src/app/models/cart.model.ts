import {Book} from './book.model';

export interface Cart {
  book: Book;
  qty: number;
}
