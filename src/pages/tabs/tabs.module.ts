import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { CardsPartialComponentModule } from './../../components/cards-partial/cards-partial.module';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    CardsPartialComponentModule
  ]
})
export class TabsPageModule {}
