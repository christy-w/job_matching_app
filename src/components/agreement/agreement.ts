import { Component } from '@angular/core';

@Component({
  selector: 'agreement-component',
  templateUrl: 'agreement.html'
})
export class AgreementComponent {
  isAgreed: boolean = false;
  privacy_content: any;

  constructor() {
    console.log('Hello AgreementComponent Component');
  }

}
