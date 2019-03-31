import { Component } from '@angular/core';
import { Api } from '../../providers';
import { Utils } from '../../core/providers/utils';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'agreement-component',
  templateUrl: 'agreement.html'
})
export class AgreementComponent {
  isAgreed: boolean = false;
  about: any;
  language: string = '';

  constructor(
    private api: Api,
    private utils: Utils,
    private view: ViewController
    ) {
    this.language = this.utils.currentLang();
    console.log('aaa', this.language);
    this.initAbout();
  }

  initAbout() {
    this.api.startQueue([
      this.api.getAbout()
    ]).then(response => {
      this.about = response[0];
      console.log('about', this.about);
    })
  }

  dismiss() {
    this.view.dismiss();
  }
}
