import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ListHewanPage } from '../list-hewan/list-hewan';  
import { DaftarKlienPage } from "../daftar-klien/daftar-klien";
import { HomePage } from "../home/home";
import { HttpClient } from '@angular/common/http';
import { APIProvider } from '../../providers/api/api';

 @Component({
  selector: 'page-all-antrian',
  templateUrl: 'all-antrian.html',
})
export class AllAntrianPage {
  user: any;
  noreg:any;
  data: any;  
  users:any;
  datas: any;  
  email_klinik:string; 
  posts: any;
  idResepsionis;
  items: Array<any> = [];
  itemString: string;
idKlien;
  profile = {
    email_klinik: ""
  };

  constructor(public navCtrl: NavController, 
    public http: HttpClient,
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public AllAntrianKlien: APIProvider,
    public loadingCtrl: LoadingController
  ) {

      this.idResepsionis = localStorage.getItem('idResepsionisLocal');
      console.log("User Id Login di page all antrian: "+this.idResepsionis);

      this.getUsers(this.idResepsionis);  
      this.getProfile(this.idResepsionis);    
   }
  
 ionViewDidLoad() {
  console.log('AllAntrianPage');
}  

  getUsers(idResepsionis){ 
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.items = [];
      
   this.AllAntrianKlien.AllKlien(idResepsionis)
   .then(
     (hasil) => {
       console.log('mengambil daftar antrian');
       this.items = [];
       
       for(let i = 0; i < hasil['items'].length; i++) {
         this.items.push({
          idKlien : hasil['items'][i]['id'],
           nama : hasil['items'][i]['nama'],
           email : hasil['items'][i]['email'],
           no_reg : hasil['items'][i]['no_reg']
         });
       } 
     this.itemString = JSON.stringify(this.items);
     loader.present();
     setTimeout(() => {
       loader.dismiss();
     }, 3000)
     })
   .catch(
     error => {
       console.error('Terjadi kesalahan: '+error);
     })
     .catch(
       () => {
       console.error('Kembalian kosong!');
     }); 
 }

  getProfile(idResepsionis){
    this.AllAntrianKlien.Profile(idResepsionis)
    .then((data)=>{
      this.profile['email_klinik'] = data['email_klinik'];
            localStorage.setItem('emailLocal', this.profile['email_klinik']);
        })
        .catch((err) => {
          console.error('Terjadi kesalahan: '+err);
        })
        .catch(() => {
          console.error('Kembalian kosong!');
        })
    } 

 
  detail(idKlien){
    this.navCtrl.push(ListHewanPage, {
      "id": idKlien
    });
  }

  Home() {
    this.navCtrl.setRoot(HomePage, {
      "id":this.idResepsionis
    });
  }

  daftar(){
    this.navCtrl.push(DaftarKlienPage, { 
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.getUsers(this.idResepsionis)

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
 
}
