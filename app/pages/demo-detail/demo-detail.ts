import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/demo-detail/demo-detail.html'
})
export class DemoDetailPage {
    constructor(private nav: NavController, private navParams: NavParams) {
        var id = this.navParams.get('id');
        console.log('id = ' + id);
    }
}