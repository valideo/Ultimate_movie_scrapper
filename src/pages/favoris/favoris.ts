import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html',
})
export class FavorisPage {

  items: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public RestProvider: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavorisPage');
  }

}
