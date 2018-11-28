import { Component } from '@angular/core';
import { NavController, 
  NavParams, App, 
  LoadingController,
  ToastController } from 'ionic-angular';import { ListHewanPage } from '../list-hewan/list-hewan';
   import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'page-cari-ktp',
  templateUrl: 'cari-ktp.html',
})
export class CariKtpPage {
  idResepsionis;
  user;
  noreg:any;
  data;    idUser;
  datas; users;
  posts: any; 
  no_reg:any; 
  nama:any; 
  alamat:any; 
  telp:any;
  email:any; 
  ktp:any;  items:any;
  id:any;
  constructor(public navCtrl: NavController, 
    public http: HttpClient,
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private app:App
  ) {
      this.idResepsionis = localStorage.getItem('idResepsionisLocal');
      console.log("id local: "+this.idResepsionis);  
   } 
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CariKtpPage');
  }

  detail(id){ 
    this.app.getRootNav().push(ListHewanPage, {
      "id": id,
      "idResepsionis":this.idResepsionis
    });
  }
  
  search(ktp){ 
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    }); 
    // console.log("cari ini id "+this.navParams.get("id"));
      this.http.get('https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/klien/v1/dataKlienKTP/'+ this.idResepsionis + "/" + this.ktp).subscribe( 
        data => {        
            loader.present(); 
          console.log(data);  
         this.user = data;  
         this.users=this.user.items; 
          //pindah halaman ke homepage           
          setTimeout(() => {
            loader.dismiss();
            // toast.present();  
          }, 3000) 
           }, err => {
            console.log(err); 
            let toast = this.toastCtrl.create({
              message: 'Data tidak ada',
              duration: 2000,
              position: 'bottom'
            });    
            toast.present(toast);
        });
   }

}
