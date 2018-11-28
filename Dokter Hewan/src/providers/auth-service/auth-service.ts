import { GooglePlus } from '@ionic-native/google-plus';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthServiceProvider {
  constructor(public googlePlus: GooglePlus,
    public storage: Storage ) {}

  googleLogin() {
    return Observable.create(observer => {
      return this.googlePlus.login({
        'webClientId': '513616640643-732aqsgf13jqjc5mu0559ing27gmfcsk.apps.googleusercontent.com',
        'offline': false
      })
      .then( res => {
        const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        firebase.auth().signInWithCredential(firecreds)
        .then( success => { observer.next(success); })
        .catch(error => {
          observer.error(error);
        });
      });
    })
  }

  logout(LoginPage){
    firebase.auth().signOut().then(function() {
      alert("logout successful");
      this.storage.set('email', '');
      this.storage.set('displayName', '');
      this.storage.set('photoURL', '');
    }, function(error) {
      console.log(error);
    });
  }
}