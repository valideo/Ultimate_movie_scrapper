import { NativeStorage } from '@ionic-native/native-storage';
import { SeasonDetailPage } from '../season-detail/season-detail';
import { RestProvider } from '../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-media-detail',
  templateUrl: 'media-detail.html',
})
export class MediaDetailPage {

  selectedMedia : any;
  mediaID : string = "";
  pageTitle : string = "";
  selectedMediaDetails : any;
  nbSeasons : number = 0;
  favorisText : string = "Ajouter aux favoris";
  isInFavorites : boolean = false;
  nbSeasonsArray : number[];
  noteFive : number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, private nativeStorage: NativeStorage) {
    this.selectedMedia = navParams.get('item');
    this.mediaID = this.selectedMedia.imdbID;
    this.getMediaDetails(this.mediaID);
    this.pageTitle = this.selectedMedia.Title;
  }

  getMediaDetails(id : string){
    this.restProvider.getMediaById(id)
    .then(data => {
      this.selectedMediaDetails = data;
      this.nbSeasons = parseInt(this.selectedMediaDetails.totalSeasons);
      this.noteFive = parseFloat(this.selectedMediaDetails.imdbRating)/2; 
      if(this.nbSeasons > 0)
        this.nbSeasonsArray = new Array(this.nbSeasons).fill(0).map((item,index) => index + 1);
    });
  }

  navigateToSeason(event, seasonNb, item){
    this.navCtrl.push(SeasonDetailPage, {seasonNb:seasonNb, item:item} );
  }

  checkIfInFavorites(){
    this.nativeStorage.keys()
    .then(data => {
      if(data.includes(this.mediaID)){
        this.favorisText = "Dans vos favoris";
        this.isInFavorites = true;
      }
    },
    error => console.error(error)
  );
  }

  testDB(ID){
    if(!this.isInFavorites)
      this.addToFavorites(ID);
    else
      this.removeFromFavorites(ID);
  }

  addToFavorites(ID : string){
    this.nativeStorage.setItem(ID, ID)
    .then(
      () => {
        this.favorisText = "Dans vos favoris";
        this.isInFavorites = true;
        console.log('Stored item!');
      },
      error => console.error('Error storing item', error)
    );
  }

  removeFromFavorites(ID : string){
    this.nativeStorage.remove(ID)
    .then(
      () => {
        this.favorisText = "Ajouter aux favoris";
        this.isInFavorites = false;
        console.log('Removed item!');
      },
      error => console.error('Error removing item', error)
    );
  }

  ionViewDidLoad() {
    this.checkIfInFavorites();
  }

}
