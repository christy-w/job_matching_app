import { Component } from '@angular/core';

@Component({
  selector: 'datetime-picker',
  templateUrl: 'datetime-picker.html'
})
export class DatetimePicker {

  text: string;

  constructor() {
    console.log('Hello DatetimePicker Component');
    this.text = 'Hello World';
  }

}
