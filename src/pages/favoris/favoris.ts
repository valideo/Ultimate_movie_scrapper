import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeStorage } from '@ionic-native/native-storage';
import { MediaDetailPage } from './../media-detail/media-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html',
})
export class FavorisPage {

  items: any = [];
  iteration: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public RestProvider: RestProvider, private nativeStorage: NativeStorage, private socialSharing: SocialSharing, private file: File) {

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
    if(key.substring(0,2) == "tt"){
      this.RestProvider.getMediaById(key)
      .then(data => {
        this.items[this.iteration] = data;
        this.iteration +=1;
      });
    }
  }

  saveAsCsv() {
    this.nativeStorage.keys()
    .then(data => {
      console.log("Keys :" + data);
      var csv: any = this.convertToCSV(data);
      var fileName: any = "favoris.csv"
      this.file.writeFile(this.file.dataDirectory, fileName, csv)
      .then((fileEntry) =>{
        console.log(fileEntry.nativeURL);
      })
    },
    error => console.error(error)
    );
  }

  convertToCSV(data) {
    var csv: any = ''
    var line: any = ''

    return csv
  }

  shareFavorites(){

    let options = {message : "testMessage", subject : "testSubject", files : ["file://favoris.csv"]};
    options
    this.socialSharing.shareWithOptions(options)
    .then(()=>{

    }).catch((err)=>{
      console.error(err);
    });
  }

  navigateToDetail(event, item){
    this.navCtrl.push(MediaDetailPage, {item:item});
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

