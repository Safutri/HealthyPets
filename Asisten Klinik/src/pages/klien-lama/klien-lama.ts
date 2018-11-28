import { Component } from '@angular/core';
import { NavController, 
  NavParams, App, 
  LoadingController,
  ToastController } from 'ionic-angular';
  import { HttpClient } from '@angular/common/http';
  import { ListHewanPage } from '../list-hewan/list-hewan'; 
import { APIProvider } from '../../providers/api/api';
  
@Component({
  selector: 'page-klien-lama',
  templateUrl: 'klien-lama.html',
})
export class KlienLamaPage {
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
  ktp:any;    
  items: Array<any> = [];
  itemString: string;
  id:any;

  constructor(public navCtrl: NavController, 
    public http: HttpClient,
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public cariPemilikHewan: APIProvider,
    private app:App
  ) {
      this.idResepsionis = localStorage.getItem('idResepsionisLocal');
      console.log("id local: "+this.idResepsionis); 
    this.search(this.idResepsionis, this.no_reg);
    } 
  
   detail(idUser){
    this.app.getRootNav().push(ListHewanPage, {
      "idUser": idUser
    });
  }
  
  search(idResepsionis, no_reg){  
    // this.items = [];
       
    this.cariPemilikHewan.CariPemilik(localStorage.getItem('idResepsionisLocal'), no_reg)
    .then((hasil) => {
      let loader = this.loadingCtrl.create({
        content: "Loading..."
      });
      loader.present(); 
         console.log('klien yang dicari');
        // muat ke daftar
        this.items = [];
        
        for(let i = 0; i < hasil['items'].length; i++) {
          this.items.push({
            id : hasil['items'][i]['id'],
            nama : hasil['items'][i]['nama'],
            email : hasil['items'][i]['email'],
            no_reg : hasil['items'][i]['no_reg']
          });
        } 
          setTimeout(() => {
          loader.dismiss();  
         }, 3000)  
        
      this.itemString = JSON.stringify(this.items);
      })
    .catch(
      error => {    
        console.error('Terjadi kesalahan: '+error);
        let toast = this.toastCtrl.create({
          message: 'data tidak ada',
          duration: 2000,
          position: 'bottom'
        });    
        toast.present(toast);
      })
      .catch(
        () => {
        console.error('Kembalian kosong!');             
      }); 
 
   }
   
}

  