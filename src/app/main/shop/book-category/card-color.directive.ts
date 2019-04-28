import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[cardColor]'
})
export class CardColorDirective {

  constructor(private el: ElementRef) {

  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.children[1].style.backgroundColor = 'red';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.children[1].style.backgroundColor = '';
  }


}
