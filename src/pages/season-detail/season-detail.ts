import { EpisodeDetailPage } from './../episode-detail/episode-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-season-detail',
  templateUrl: 'season-detail.html',
})
export class SeasonDetailPage {

  selectedSeason : any;
  mediaID : string;
  pageTitle : string = "";
  selectedSeasonDetails : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.selectedSeason = navParams.get('seasonNb');
    this.mediaID = navParams.get('item').imdbID;
    this.getSeasonDetails(this.mediaID, this.selectedSeason);
    this.pageTitle = "Saison "+this.selectedSeason+" - "+navParams.get('item').Title;
  }

  getSeasonDetails(id : string, season : string){
    this.restProvider.getSeasonByNumber(id, season)
    .then(data => {
      console.log(data);
      this.selectedSeasonDetails = data;
    });
  }

  navigateToEpisode(event, mediaID, seasonNb, episodeNb){
    this.navCtrl.push(EpisodeDetailPage, {mediaID:mediaID, seasonNb:seasonNb, episodeNb:episodeNb} );
  }

  ionViewDidLoad() {
  }

}
