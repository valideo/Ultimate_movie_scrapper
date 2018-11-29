import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesPage } from './movies';
import { CardsPartialComponent } from './../../components/cards-partial/cards-partial';

@NgModule({
  declarations: [
    MoviesPage,
    CardsPartialComponent
  ],
  imports: [
    IonicPageModule.forChild(MoviesPage),
  ],
})
export class MoviesPageModule {}

