import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { UploadPage } from '../pages/upload/upload';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

export const firebaseConfig = {
  apiKey: "AIzaSyCuZqJiAs2_tw14xO5aJIlGDn9B_MI2ES4",
  authDomain: "gag-f8089.firebaseapp.com",
  databaseURL: "https://gag-f8089.firebaseio.com",
  projectId: "gag-f8089",
  storageBucket: "gag-f8089.appspot.com",
  messagingSenderId: "610619218313"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UploadPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
