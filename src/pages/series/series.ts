import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-series',
  templateUrl: 'series.html',
})
export class SeriesPage {

  items: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public RestProvider: RestProvider) {
  }

  getSeries(key : string) {
    this.RestProvider.searchSerieByKey(key)
    .then(data => {
      this.items = data;
      console.log(this.items);
    });
  }

  searchSerie(ev: any) {
    const val = ev.target.value;
    

    if (val && val.trim() != '') {
      this.getSeries(val);
    }

  }

  ionViewDidLoad() {
  }

}

