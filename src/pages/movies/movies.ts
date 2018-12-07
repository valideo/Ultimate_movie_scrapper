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
  newData: any = [];
  page: number = 1;
  keywords: string = "";
  notAllLoaded: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public RestProvider: RestProvider) {
  }

  getMovies(key : string) {
    this.RestProvider.searchMovieByKey(key, this.page.toString())
    .then(data => {
      this.items = data;
      console.log(this.items);
    });
  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');
    this.page +=1;
    return new Promise((resolve) => {
      setTimeout(() => {
    this.RestProvider.searchMovieByKey(this.keywords, this.page.toString())
    .then(data => {
     this.newData = data;
      console.log(this.newData);
      console.log(this.page);
      for (var i = 0; i < this.newData.length ; i++) {
        this.items.push( this.newData[i] );
        if(this.newData.length < 10 && i == this.newData.length -1){
          this.notAllLoaded = false;
        }
      }
    });
        console.log('Async operation has ended');
        resolve();
      }, 500);
    })
  }

  searchMovie(ev: any) {
    this.notAllLoaded = true;
    this.keywords = ev.target.value;
    if (this.keywords && this.keywords.trim() != '') {
      this.getMovies(this.keywords);
    }

  }
  navigateToDetail(event, item){
    this.navCtrl.push(MediaDetailPage, {item:item});
  }

  ionViewDidLoad() {
  }

}
