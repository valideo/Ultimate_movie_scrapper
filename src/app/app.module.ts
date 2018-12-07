import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';
import { StarRatingModule } from 'ionic3-star-rating';
import { SocialSharing } from '@ionic-native/social-sharing';
import { File } from '@ionic-native/file';

//root
import { MyApp } from './app.component';

//providers
import { RestProvider } from '../providers/rest/rest';

//pages
import { MediaDetailPage } from './../pages/media-detail/media-detail';
import { SeasonDetailPage } from './../pages/season-detail/season-detail';
import { EpisodeDetailPage } from './../pages/episode-detail/episode-detail';

//components
import { TabsPageModule } from './../pages/tabs/tabs.module';

@NgModule({
  declarations: [
    MyApp,
    MediaDetailPage,
    SeasonDetailPage,
    EpisodeDetailPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TabsPageModule,
    HttpClientModule,
    StarRatingModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MediaDetailPage,
    SeasonDetailPage,
    EpisodeDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    NativeStorage,
    SocialSharing,
    File,
  ]
})
export class AppModule {}
