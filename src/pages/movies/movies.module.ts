import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesPage } from './movies';
import { CardsPartialComponentModule } from './../../components/cards-partial/cards-partial.module';

@NgModule({
  declarations: [
    MoviesPage
  ],
  imports: [
    IonicPageModule.forChild(MoviesPage),
    CardsPartialComponentModule
  ],
})
export class MoviesPageModule {}

