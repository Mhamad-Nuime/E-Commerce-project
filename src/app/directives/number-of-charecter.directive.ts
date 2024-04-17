import { Directive, HostListener, Input, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numberOfCharecter]',
  standalone: true
})
export class NumberOfCharecterDirective {
  @Input() numberOfCharecter! : number;

  private ngControl = inject(NgControl);

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputValue = this.ngControl.value;
    console.log(`Input value length is: ${inputValue.length} and the allowed number of characters is: ${this.numberOfCharecter}`);
    if (inputValue.length > this.numberOfCharecter) {
      this.ngControl.control?.setValue(inputValue.slice(0, this.numberOfCharecter));
    }
  }
}
