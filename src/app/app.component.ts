import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth-provider';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  
  constructor(platform: Platform, public auth: AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      //Check if user is authenticated
      auth.onAuth.subscribe((authState)=>{
        if (authState){
          console.log('Logged in user :', authState.auth.email);
        }
      }); 
    });
  }
}
