import { Component } from '@angular/core';
import { NavController, 
  NavParams,
  LoadingController } from 'ionic-angular';
 import { HttpClient } from '@angular/common/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import firebase from 'firebase'; 

var config = {
  apiKey: "AIzaSyA5ICza7lXvzBmZqqi_czD0A9W--fSJBZc",
  authDomain: "healthypets-dokter-hewan.firebaseapp.com",
  databaseURL: "https://healthypets-dokter-hewan.firebaseio.com",
  projectId: "healthypets-dokter-hewan",
  storageBucket: "healthypets-dokter-hewan.appspot.com",
  messagingSenderId: "513616640643"
}; 

@Component({
  selector: 'page-profile-user',
  templateUrl: 'profile-user.html',
})
export class ProfileUserPage {

  urls = 'https://healthypets-webservice.appspot.com/_ah/api/drh/v1/cari/';
  idDrh: any; users:any; nama:any; email_klinik:string;
  alamat:any; telp:any; email:any; nama_klinik:string;
  no_praktik:any; namaDrh; photoURL: any; 

  constructor(public nav: NavController,    
    public navParams:NavParams,
    public http: HttpClient,
    public loadingCtrl: LoadingController,  
    public authProvider: AuthServiceProvider,
    public storage: Storage) {
 
      this.idDrh = localStorage.getItem('idDrhLocal');
      console.log("id local: "+this.idDrh); 

      this.getUser();
   }

   ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUserPage');
      if (this.email != '') {
        this.storage.get('photoURL').then((val) => this.photoURL = val);
      }
      firebase.initializeApp(config);
  }

  getUser(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    }); loader.present(); 
    this.http.get(this.urls+this.idDrh).subscribe(  
      data=> {
        console.log(data);
        this.users = data;
          this.nama = this.users.nama; 
            this.email = this.users.email; 
              this.telp = this.users.telp; 
                this.alamat = this.users.alamat; 
                  this.email_klinik = this.users.email_klinik; 
                    this.nama_klinik = this.users.nama_klinik; 
                        this.no_praktik = this.users.no_praktik;
                        setTimeout(() => {
                          loader.dismiss();  
                        }, 3000);
         },
         
      err => {
        console.log(err);
      }
    );
  }

}
