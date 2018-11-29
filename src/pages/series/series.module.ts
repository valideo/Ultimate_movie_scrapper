import { CardsPartialComponentModule } from './../../components/cards-partial/cards-partial.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeriesPage } from './series';

@NgModule({
  declarations: [
    SeriesPage
  ],
  imports: [
    IonicPageModule.forChild(SeriesPage),
    CardsPartialComponentModule
  ],
})
export class SeriesPageModule {}
