import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import firebase from 'firebase'; 
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { APIProvider } from '../../providers/api/api';

var firebaseConfig = {
  apiKey: "AIzaSyA80bXtbdShe0tobr7k36VpBiCdVRFuMwA",
  authDomain: "healthypets-resepsionis.firebaseapp.com",
  databaseURL: "https://healthypets-resepsionis.firebaseio.com",
  projectId: "healthypets-resepsionis",
  storageBucket: "healthypets-resepsionis.appspot.com",
  messagingSenderId: "229744820932"
};

@IonicPage()
@Component({
  selector: 'page-profile-user',
  templateUrl: 'profile-user.html',
})

export class ProfileUserPage {
 
  photoURL: any; 

  urls = 'https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/resepsionis/v1/cari/';
  idResepsionis: any; users:any; nama:any; email_klinik:string;
  alamat:any; telp:any; email:any; nama_klinik:string;
  datas;

  constructor(public nav: NavController,    
    public navParams:NavParams,
    public http: HttpClient,
    public storage: Storage,
    public authProvider: AuthServiceProvider,
    public profResepsionis: APIProvider) {
 
        this.idResepsionis = localStorage.getItem('idResepsionisLocal');
        console.log("id local: "+this.idResepsionis);
        
        // this.getUser(this.idResepsionis);
        this.getUser();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUserPage');
      // ambil informasi user yang login dari local storage
      if (this.email != '') {
        this.storage.get('photoURL').then((val) => this.photoURL = val);
      }
      firebase.initializeApp(firebaseConfig);
  }

      getUser(){
      //   this.profResepsionis.ProfileResepsionis(idResepsionis)
      //     .then((data)=>{
      //       this.datas['nama'] = data['nama'];
      //       this.datas['email'] = data['email'];
      //       this.datas['telp'] = data['telp'];
      //       this.datas['alamat'] = data['alamat'];
      //       this.datas['email_klinik'] = data['email_klinik'];
      //       this.datas['nama_klinik'] = data['nama_klinik'];
      //         })
      //         .catch((err) => {
      //           console.error('Terjadi kesalahan: '+err);
      //         })
      //         .catch(() => {
      //           console.error('Kembalian kosong!');
      //         })

        this.http.get(this.urls+this.idResepsionis).subscribe(
          data=> {
            console.log(data);
            this.users = data;
              this.nama = this.users.nama; 
              this.email = this.users.email; 
              this.telp = this.users.telp; 
              this.alamat = this.users.alamat; 
              this.email_klinik = this.users.email_klinik; 
              this.nama_klinik = this.users.nama_klinik; 
             },
          err => {
            console.log(err);
          }
        );
      }
}