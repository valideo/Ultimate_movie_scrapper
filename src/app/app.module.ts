import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';

//root
import { MyApp } from './app.component';

//providers
import { RestProvider } from '../providers/rest/rest';

//pages
import { MovieDetailPage } from './../pages/movie-detail/movie-detail';
import { SeasonDetailPage } from './../pages/season-detail/season-detail';

//components
import { TabsPageModule } from './../pages/tabs/tabs.module';

@NgModule({
  declarations: [
    MyApp,
    MovieDetailPage,
    SeasonDetailPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TabsPageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MovieDetailPage,
    SeasonDetailPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
