import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  moviesRoot = 'MoviesPage'
  seriesRoot = 'SeriesPage'
  favRoot = "FavorisPage"
  mapRoot = "MapPage"


  constructor(public navCtrl: NavController) {}

}
