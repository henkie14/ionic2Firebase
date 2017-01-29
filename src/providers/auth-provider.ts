import { Injectable, EventEmitter, Inject } from '@angular/core';
import { AuthProviders, AngularFire, FirebaseAuthState, AuthMethods, FirebaseApp } from 'angularfire2'; //Add FirebaseApp
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthProvider {
  private authState: FirebaseAuthState;
  public onAuth: EventEmitter<FirebaseAuthState> = new EventEmitter();
  public firebase : any; //Add native firebase
  
  constructor(private af: AngularFire, @Inject(FirebaseApp)firebase: any) { //Add reference to native firebase SDK
    this.firebase = firebase;  //Add reference to native firebase SDK
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      this.onAuth.emit(state);
    });
  }
  
  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.login(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((authData) => {
        //console.log(authData);
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.af.auth.createUser(credentials).then(authData => {
        //authData.auth.updateProfile({displayName: credentials.displayName, photoURL: credentials.photoUrl}); //set name and photo
        observer.next(authData);
      }).catch(error => {
        //console.log(error);
        observer.error(error);
      });
    });
  }
  
  resetPassword(emailAddress:string){
    return Observable.create(observer => {
      this.firebase.auth().sendPasswordResetEmail(emailAddress).then(function(success) {
          //console.log('email sent', success);
          observer.next(success);
        }, function(error) {
          //console.log('error sending email',error);
          observer.error(error);
        });
     });
  }

  logout() {
    this.af.auth.logout();
  }

  get currentUser():string{
    return this.authState?this.authState.auth.email:'';
  } 
}
