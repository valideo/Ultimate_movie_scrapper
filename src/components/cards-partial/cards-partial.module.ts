import { CardsPartialComponent } from './cards-partial';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    CardsPartialComponent,
  ],
  imports: [
    IonicPageModule.forChild(CardsPartialComponent),
  ],
  exports: [
    CardsPartialComponent,
  ],
})
export class CardsPartialComponentModule {}

