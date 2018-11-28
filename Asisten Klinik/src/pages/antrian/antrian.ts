import { Component } from '@angular/core';
import { NavController, LoadingController, 
  PopoverController, AlertController, 
  NavParams } from "ionic-angular";
import { HapusAntrianPage} from "../hapus-antrian/hapus-antrian"; 
import { HomePage } from '../home/home'; 
import { HttpClient } from '@angular/common/http';
import { TabsPage } from "../tabs/tabs";
import { APIProvider } from '../../providers/api/api';

@Component({
  selector: 'page-antrian',
  templateUrl: 'antrian.html',
})
export class AntrianPage {
  idResepsionis;
  user: any;
  data: any;
  nama: String; 
  items: Array<any> = [];
  itemString: string;

  constructor(public nav: NavController, 
    public popoverCtrl: PopoverController,  
    public alert:AlertController,
    public loadingCtrl: LoadingController, 
    public http: HttpClient,
    public antrianKlien: APIProvider,
    public navParams:NavParams) { 
      this.idResepsionis = localStorage.getItem('idResepsionisLocal');
      console.log("id local: "+this.idResepsionis); 

      this.getUsers(this.idResepsionis); 
    }
  
  ionViewDidLoad() {
    console.log('AntrianPage');
  } 
 

  getUsers(idResepsionis){ 
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.items = [];       
    this.antrianKlien.AntrianKlien(idResepsionis)
    .then(
      (hasil) => {
        console.log('mengambil daftar antrian');
        this.items = [];
        
        for(let i = 0; i < hasil['items'].length; i++) {
          this.items.push({
            idKlien : hasil['items'][i]['id'],
            nama : hasil['items'][i]['nama'],
            jenis: hasil['items'][i]['jenis'],
            gender : hasil['items'][i]['gender'],
            umur : hasil['items'][i]['umur'],
            ambs : hasil['items'][i]['ambs'],
            no_reg : hasil['items'][i]['no_reg']
          });
        }          
          loader.present();
          setTimeout(() => {
            loader.dismiss(); 
          }, 2000)
      this.itemString = JSON.stringify(this.items);
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

  detail(idKlien, ambs){
    
    this.nav.push(HapusAntrianPage, {
      "id": idKlien,
      "ambs":ambs
    });
  }

  Home() {
    this.nav.setRoot(HomePage);
  }
  
  Search(){ 
    this.nav.push(TabsPage);
  } 

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
     this.getUsers(this.idResepsionis);
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.getUsers(this.idResepsionis);
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
