import { SeasonDetailPage } from './../season-detail/season-detail';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {

  selectedMedia : any;
  mediaID : string;
  pageTitle : string = "";
  selectedMediaDetails : any;
  nbSeasons : number = 0;
  nbSeasonsArray : number[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.selectedMedia = navParams.get('item');
    this.mediaID = this.selectedMedia.imdbID;
    this.getMediaDetails(this.mediaID);
    this.pageTitle = this.selectedMedia.Title;
    console.log(this.selectedMedia);

  }

  getMediaDetails(id : string){
    this.restProvider.getMediaById(id)
    .then(data => {
      console.log(data);
      this.selectedMediaDetails = data;
      this.nbSeasons = parseInt(this.selectedMediaDetails.totalSeasons);
      if(this.nbSeasons > 0)
        this.nbSeasonsArray = new Array(this.nbSeasons).fill(0).map((item,index) => index + 1);
    });
  }

  navigateToSeason(event, item){
    this.navCtrl.push(SeasonDetailPage, {item:item});
  }

  ionViewDidLoad() {
  }

}
