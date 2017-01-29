import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup'; 
import { ResetPasswordPage } from '../pages/reset-password/reset-password'; //Added reset password page
import { AngularFireModule } from 'angularfire2';
import { AuthProvider} from '../providers/auth-provider' 

export const firebaseConfig = {
  apiKey: '*****',
  authDomain: '*****',
  databaseURL: '*****',
  storageBucket: '*****',
  messagingSenderId: '*****'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    ResetPasswordPage //Added reset password page
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    ResetPasswordPage //Added reset password page
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthProvider]
})
export class AppModule {}
