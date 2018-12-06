import { MediaDetailPage } from './../media-detail/media-detail';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {

  items: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public RestProvider: RestProvider) {
  }

  getMovies(key : string) {
    this.RestProvider.searchMovieByKey(key)
    .then(data => {
      this.items = data;
      console.log(this.items);
    });
  }

  searchMovie(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.getMovies(val);
    }

  }
  navigateToDetail(event, item){
    this.navCtrl.push(MediaDetailPage, {item:item});
  }

  ionViewDidLoad() {
  }

}
