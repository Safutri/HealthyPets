import {Component} from "@angular/core";
import { NavController,
  NavParams, 
  LoadingController,
  ToastController,
  AlertController,
  MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'; 
import { ProfileUserPage } from "../profile-user/profile-user";
import { KlienLamaPage } from "../klien-lama/klien-lama"; 
import { AllRawatPage } from "../all-rawat/all-rawat"; 
import { ApiProvider } from "../../providers/api/api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
}) 

export class HomePage {  
  antrian;
  idDrh; 
  data; 
  antri;
  datas;
  idAmb;
  email_klinik:String;
  nama:String; 
  drh_jaga: any;  
  id: any; 
  namaDrh: string;
  items: Array<any> = [];
  itemString: string;
  profile = {
    email_klinik: ""
  };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alert:AlertController,
    public loadingCtrl: LoadingController,  
    public http: HttpClient,
    public HomeP: ApiProvider,
    public menu: MenuController, 
    public toastCtrl: ToastController
  ) { 
    this.menu.enable(true);
    this.idDrh = localStorage.getItem('idDrhLocal');
    console.log("id local: "+this.idDrh);  
    this.namaDrh = localStorage.getItem('namaLocal');
    console.log("nama user: "+this.namaDrh);   
 

    // this.getAntrian(this.idDrh); 
    this.getAntrian(); 
    this.getUser(this.idDrh);
    
    // this.getUser();
  }

  ionViewWillEnter(){
    this.getAntrian();
    } 
   
  getAntrian(){ 
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.http.get('https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/klienantri/v1/antri?drh_jaga='+this.idDrh).subscribe(
      data => { 
        console.log("id drh di antrian "+this.idDrh);
         console.log(data);
         this.datas = data;
         this.antri = this.datas.items;  
         setTimeout(() => {
          loader.dismiss(); 
        }, 3000)  
       }, err => {
        console.log(err);  

        console.log(err);
        const toast = this.toastCtrl.create({
          message: 'Antrian belum ada',
          duration: 3000
        });
        toast.present(); 
      }

    );
  }

  getUser(idDrh){
    this.HomeP.getKlien(idDrh)
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
 
  goToAccount() {
    this.navCtrl.push(ProfileUserPage, {  
    });
  }

  search() {
    this.navCtrl.push(KlienLamaPage, {  
    });
  } 

    queue(no_reg, kode_hewan, id){
      console.log('id '+id); 
       this.navCtrl.push(AllRawatPage, {
         'no_reg' : no_reg,
         'kode_hewan' : kode_hewan,
         'idAntrian' : id,
         'idDrh' : this.idDrh,
         'namaDrh': this.namaDrh
       });
      }

    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
  
      setTimeout(() => {
       this.getAntrian();
        refresher.complete();
      }, 2000);
    }

    doInfinite(infiniteScroll) {
      console.log('Begin async operation');
  
      setTimeout(() => {
        this.getAntrian();
        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 500);
    }
    
}