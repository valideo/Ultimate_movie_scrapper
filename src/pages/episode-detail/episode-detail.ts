import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-episode-detail',
  templateUrl: 'episode-detail.html',
})
export class EpisodeDetailPage {

  selectedEpisode : any;
  selectedSeason : any;
  mediaID : string;
  selectedEpisodeDetails : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.selectedEpisode = navParams.get('episodeNb');
    this.mediaID = navParams.get('mediaID');
    this.selectedSeason = navParams.get('seasonNb');
    this.getEpisodeDetails(this.mediaID, this.selectedSeason ,this.selectedEpisode);
  }

  getEpisodeDetails(id : string, season : string, episode : string){
    this.restProvider.getEpisodeByNumber(id, season, episode)
    .then(data => {
      console.log(data);
      this.selectedEpisodeDetails = data;
    });
  }

  ionViewDidLoad() {
  }

}
