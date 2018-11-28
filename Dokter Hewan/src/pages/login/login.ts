import {Component} from "@angular/core";
import {NavController, 
  AlertController, 
  ToastController, 
  MenuController,   
  LoadingController} from "ionic-angular";
import {HomePage} from "../home/home"; 
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [GooglePlus] 
})
export class LoginPage {  
  // splash = true;      
  displayName: any;
  email: any;
  id: any; nama:string;
  photoURL: any;
  isLoggedIn:boolean = false;
  user; emailValid:any; 
  email_klinik:string;

  constructor(public authProvider: AuthServiceProvider, 
    public loadingCtrl: LoadingController,  
    public nav: NavController, 
    public alertCtrl: AlertController, 
    private storage: Storage, 
    public menu: MenuController, 
    private googlePlus: GooglePlus,
    public toastCtrl: ToastController, 
    public http: HttpClient) {
      this.menu.enable(false);
} 

loginWithGoogle(): void{ 
  let loader = this.loadingCtrl.create({
    content: "Please wait..."
  }); 
    loader.present(); 
  this.authProvider.googleLogin().subscribe((res) => { 
    this.email = res.email;
    this.displayName = res.displayName;
    this.photoURL = res.photoURL;
    this.isLoggedIn = true;
      this.http.get('https://healthypets-webservice.appspot.com/_ah/api/drh/v1/logins/'+ this.email).subscribe(
      data => {
      console.log(data);  
       this.user = data;  
       this.id = this.user.id;
       this.nama = this.user.nama;
       this.email_klinik = this.user.email_klinik;
       localStorage.setItem("idDrhLocal", this.id);
       localStorage.setItem("namaLocal", this.nama);
       localStorage.setItem("emaiKlinikLocal", this.email_klinik);
       this.email =this.user.email;
          
              //TODO: pengujian
            this.presentToast('Welcome: '+ this.displayName);
            //simpan informasi user yang login ke storage
            this.storage.set('email', this.email).then(() => {
              this.storage.set('photoURL', this.photoURL);
              this.storage.set('displayName', this.displayName).then(() => {
                 //pindah halaman ke homepage           
                 setTimeout(() => {
                  loader.dismiss();
                  // toast.present();
                  // back to home page
                  this.nav.setRoot(HomePage, {
                    'id': this.id,
                    // 'email': this.email,
                    'namaLocal': this.displayName
                  }); 
                }, 3000);
              });

            }); 
          }, err => {
            console.log(err); 
            setTimeout(() => {  
              loader.dismiss(); 
              const alert = this.alertCtrl.create({
                title: 'Confirmation',
                subTitle: 'Email tidak terdaftar di HealthyPets',
                buttons: ['OK']                
              });
              alert.present();
              // this.storage.set('email', '');
              // this.storage.set('photoURL', '');
              // this.storage.set('displayName', '');
              this.googlePlus.logout().then(res => {
                this.email = res.email;
                this.isLoggedIn = false;
                this.nav.setRoot(LoginPage);
                
                console.log(localStorage.getItem('email'));
                localStorage.removeItem('email')
              }).catch(err => console.error(err));
  
              this.nav.setRoot(LoginPage);
            }, 1000)     
        }); 
      }, 
      err =>{
        console.log(err);
        this.presentToast('Gagal Login');
      });       
}

presentToast(message: string) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'center'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
} 
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Mohon tunggu...",
    });
    loader.present();

    // tutup loading, ketika sessionId sudah ditemukan!
    setTimeout(() => {
      loader.dismiss();
    }, 1000);
  }  

      // ionViewDidLoad() {
      //   setTimeout(()=> {
      //     this.splash = false;
      //   }, 4000);
      // }
}
