import { Component, ViewChild } from "@angular/core";
import { Platform, 
          Nav, 
          MenuController, 
          ToastController, 
          AlertController} from "ionic-angular";
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { Events } from 'ionic-angular';
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login"; 
import { ProfileUserPage } from "../pages/profile-user/profile-user";
import { AntrianPage } from '../pages/antrian/antrian';  
import firebase from 'firebase'; 
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { GooglePlus } from "@ionic-native/google-plus";
import { TabsCariPage } from "../pages/tabs-cari/tabs-cari";
import { AllAntrianPage } from "../pages/all-antrian/all-antrian";

export interface MenuItem {
    title: string;  
    component: any;
    icon: string;
}

var firebaseConfig = {
  apiKey: "AIzaSyA80bXtbdShe0tobr7k36VpBiCdVRFuMwA",
  authDomain: "healthypets-resepsionis.firebaseapp.com",
  databaseURL: "https://healthypets-resepsionis.firebaseio.com",
  projectId: "healthypets-resepsionis",
  storageBucket: "healthypets-resepsionis.appspot.com",
  messagingSenderId: "229744820932"
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
    public menu: MenuController,
    private googlePlus: GooglePlus,
    public toastController: ToastController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public storage: Storage,
    public alerCtrl: AlertController,
    public events: Events,
    public authProvider: AuthServiceProvider,
  ) { 
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Klien Klinik', component: AllAntrianPage, icon: 'medkit'},
      {title: 'Cari Klien', component: TabsCariPage, icon: 'search'},
      {title: 'Antrian', component: AntrianPage, icon: 'paper'},
      {title: 'Profile', component: ProfileUserPage, icon: 'person'}
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
          //     setTimeout(() => { this.counter = 0 }, 3000)
          //   } else {
          //   this.platform.exitApp();
          //   }
          // }, 0)
      }, 100);

      
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
 
      //*** Control Keyboard
      this.keyboard.disableScroll(true);
      
      this.storage.get('email').then((val) => this.email = val);
      // ambil informasi user yang login dari local storage
      if (this.email != '') {
        this.storage.get('photoURL').then((val) => this.photoURL = val);
        this.storage.get('displayName').then((val) => this.displayName = val);  
      }

      firebase.initializeApp(firebaseConfig);
    });
    
  }

  // presentToast() {
  //   let toast = this.toastController.create({
  //     message: "Press again to exit",
  //     duration: 3000,
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
              // this.nav.setRoot(LoginPage);
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
