import { Component } from '@angular/core';

@Component({
  selector: 'search-filter',
  templateUrl: 'search-filter.html'
})
export class SearchFilter {

  text: string;

  constructor() {
    console.log('Hello SearchFilter Component');
    this.text = 'Hello World';
  }

}
