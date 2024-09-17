import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[TelDirective]',
})
export class TelDirective {
  constructor(public ngControl: NgControl) {}

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: string) {
    if (event) {
      this.onInputChange(event, false);
    }
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: KeyboardEvent) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.onInputChange(inputValue, true);
  }

  onInputChange(value: string, backspace: boolean) {
    let formattedValue = value.replace(/\D/g, ''); // Remove all non-digit characters

    if (formattedValue.length === 0) {
      formattedValue = '';
    } else if (formattedValue.length <= 9) {
      if (formattedValue.length <= 2) {
        formattedValue = formattedValue.replace(/^(\d{0,2})/, '$1');
      } else if (formattedValue.length <= 5) {
        formattedValue = formattedValue.replace(/^(\d{0,2})(\d{0,3})/, '$1-$2');
      } else {
        formattedValue = formattedValue.replace(/^(\d{0,2})(\d{0,3})(\d{0,4})/, '$1-$2-$3');
      }
    } else {
      formattedValue = formattedValue.substring(0, 10);
      formattedValue = formattedValue.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1-$2-$3');
    }

    this.ngControl.valueAccessor?.writeValue(formattedValue);
  }
}
