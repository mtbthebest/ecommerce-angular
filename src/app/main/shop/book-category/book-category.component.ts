import {Component, HostListener, Input, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {
  @Input() categories;
  @Input() isActive;
  @Output() onCategoryClick: EventEmitter<String>;

  constructor() {
    this.isActive = 0;
    this.onCategoryClick = new EventEmitter();

  }

  ngOnInit() {
  }

  changeCategory(category: string, i: number) {
    this.isActive = i;
    this.onCategoryClick.emit(category);

  }
}
