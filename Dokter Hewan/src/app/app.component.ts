import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, ToastController, MenuController, AlertController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import firebase from 'firebase/app';
import { LoginPage } from "../pages/login/login"; 
import { ProfileUserPage } from "../pages/profile-user/profile-user";
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { HomePage } from "../pages/home/home";
import { KlienLamaPage } from "../pages/klien-lama/klien-lama";
import { GooglePlus } from "@ionic-native/google-plus";


export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

var config = {
  apiKey: "AIzaSyA5ICza7lXvzBmZqqi_czD0A9W--fSJBZc",
  authDomain: "healthypets-dokter-hewan.firebaseapp.com",
  databaseURL: "https://healthypets-dokter-hewan.firebaseio.com",
  projectId: "healthypets-dokter-hewan",
  storageBucket: "healthypets-dokter-hewan.appspot.com",
  messagingSenderId: "513616640643"
};

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  appMenuItems: Array<MenuItem>;
  email: any;
  photoURL: any;
  displayName: any;
  isLoggedIn:boolean = false;
  public counter=0;
  
  constructor(
    public platform: Platform,
    public alerCtrl: AlertController,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public storage: Storage,
    public events: Events,
    private googlePlus: GooglePlus,
    public authProvider: AuthServiceProvider,
    public toastController: ToastController
  ) {

    this.initializeApp();

    this.appMenuItems = [  
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Klien Klinik', component: KlienLamaPage, icon: 'medkit'}, 
      {title: 'Profile', component: ProfileUserPage, icon: 'person'}, 
    ];
 }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.splashScreen.hide();
        // this.platform.registerBackButtonAction(() => {
        //   if (this.counter == 0) {
        //     this.counter++;
        //     this.presentToast();
        //     setTimeout(() => { this.counter = 0 }, 2000)
        //   } else {
        //     // console.log("exitapp");
        //   this.platform.exitApp();
        //   }
        // }, 0)
      }, 100);
     this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false); 
      this.keyboard.disableScroll(true);

      this.storage.get('email').then((val) => this.email = val);
      if (this.email != '') {
        this.storage.get('photoURL').then((val) => this.photoURL = val);
        this.storage.get('displayName').then((val) => this.displayName = val);  
      }

      firebase.initializeApp(config);
    });
  }

  // presentToast() {
  //   let toast = this.toastController.create({
  //     message: "Press again to exit",
  //     duration: 2000,
  //     position: "middle"
  //   });
  //   toast.present();
  // }

  openPage(page) {
    this.menu.close();  
    this.nav.setRoot(page.component);
  }
 
  logout(){
    let confirm = this.alerCtrl.create({
      title: 'Konfirmasi',
      message: 'Apakah anda yakin ingin keluar dari aplikasi HealthyPets ?',
      buttons: [
        {
          text: 'OK',
          handler: () => {   
            this.googlePlus.logout().then(res => {   
              this.email = res.email;
              this.isLoggedIn = false;
              this.nav.setRoot(LoginPage);
              
              console.log(localStorage.getItem('email'));
              localStorage.removeItem('email')
              this.platform.exitApp();
            }).catch(err => console.error(err));
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present() 
  }

}
