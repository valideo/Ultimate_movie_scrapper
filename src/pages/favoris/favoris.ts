import { NativeStorage } from '@ionic-native/native-storage';
import { MovieDetailPage } from './../movie-detail/movie-detail';
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
  iteration: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public RestProvider: RestProvider, private nativeStorage: NativeStorage) {
  }

  loadMedias(){
    this.nativeStorage.keys()
    .then(data => {
      console.log("Keys :" + data);
      this.items = [];
      for(var i in data){
        this.getMedia(data[i]);
      }
      console.log(this.items);
    },
    error => console.error(error)
  );
  }

  getMedia(key : string) {
    this.RestProvider.getMediaById(key)
    .then(data => {
      this.items[this.iteration] = data;
      this.iteration +=1;
    });
  }

  navigateToDetail(event, item){
    this.navCtrl.push(MovieDetailPage, {item:item});
  }

  clearAll(){
    this.nativeStorage.clear();
    this.loadMedias();
  }

  ionViewDidEnter(){
    this.iteration = 0;
    this.loadMedias();
  }

}

