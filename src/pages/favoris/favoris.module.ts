import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavorisPage } from './favoris';
import { CardsPartialComponentModule } from './../../components/cards-partial/cards-partial.module';

@NgModule({
  declarations: [
    FavorisPage,
  ],
  imports: [
    IonicPageModule.forChild(FavorisPage),
    CardsPartialComponentModule,
  ],
})
export class FavorisPageModule {}
