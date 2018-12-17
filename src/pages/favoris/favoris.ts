import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeStorage } from '@ionic-native/native-storage';
import { MediaDetailPage } from './../media-detail/media-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { IOSFilePicker } from '@ionic-native/file-picker';

@IonicPage()
@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html',
})
export class FavorisPage {

  items: any = [];
  keys: any = [];
  iteration: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public RestProvider: RestProvider, private nativeStorage: NativeStorage, private socialSharing: SocialSharing, private file: File, private alertCtrl: AlertController, private fileChooser: FileChooser, public plt: Platform, private filePicker: IOSFilePicker) {

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
        this.keys[this.iteration] = key;
        this.iteration +=1;
      });
    }
  }

  saveAsCsv() {

      var csv: string = "";
      console.log(this.keys);
      this.keys.forEach(item => {
        csv += item.toString() + ",";
      });
      console.log(csv);
      var fileName: any = "favoris.csv";
      console.log(this.file.dataDirectory);
      this.file.writeFile(this.file.dataDirectory, fileName, csv, {replace : true})
      .then((fileEntry) =>{
        console.log(fileEntry);
        this.shareFile(fileEntry.nativeURL.toString());
      }).catch((err)=>{
        console.log("error writing file");
        console.error(err);
      });
  }

  openCsv(){
    const confirm = this.alertCtrl.create({
      title: 'Importer les favoris ?',
      message: 'Attention ! Importer vos favoris supprimera vos favoris actuels. Continuer ?',
      buttons: [
        {
          text: 'Refuser',
          handler: () => {}
        },
        {
          text: 'Accepter',
          handler: () => {

            if (this.plt.is('android')) {

            this.fileChooser.open()
            .then(uri => {
              console.log(uri);
            })
            .catch(e => console.log(e));

          }

            if (this.plt.is('ios')) {

              this.filePicker.pickFile()
              .then(uri => {
                console.log(uri);
              })
              .catch(err => console.log('Error', err));

            }
          }
          
        }
      ]
    });
    confirm.present();
    }

  shareFile(url : string){
    let options = {message : "testMessage", subject : "testSubject", files : [url]};
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

