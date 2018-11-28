import { Component } from '@angular/core';
import { NavController, 
  NavParams, 
  LoadingController,
  AlertController } from 'ionic-angular';
import { ListHewanPage } from '../list-hewan/list-hewan'; 
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'page-klien-lama',
  templateUrl: 'klien-lama.html',
})
export class KlienLamaPage {
  idDrh; namaDrh;
  user;  email_klinik; 
  no_reg:any; datas;
  constructor(public navCtrl: NavController, 
    public http: HttpClient,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) { 
    this.email_klinik = localStorage.getItem("emaiKlinikLocal");
      console.log("email klinik : "+this.email_klinik);

      this.idDrh = localStorage.getItem('idDrhLocal');
      console.log("id local: "+this.idDrh);  
 
      this.namaDrh = localStorage.getItem('namaLocal');
      console.log("nama user: "+this.namaDrh);  

    this.getAllKlien();
  }

  ionViewDidLoad() {  
    console.log('ionViewDidLoad KlienLamaPage');
  } 
 
  getAllKlien(){
    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();
    this.http.get('https://healthypets-webservice.appspot.com/_ah/api/klien/v1/daftarbyKlinik/'+this.email_klinik).subscribe(
      data => { 
         console.log(data);
         this.datas = data;
         this.user=this.datas.items;

       }, err => {
        console.log(err); 
        }
    );
  }  
  
  detail(id, no_reg){
    this.navCtrl.push(ListHewanPage, { 
      'idDrh' : this.idDrh,
      'id': id,
      'no_reg':no_reg,
      'namaDrh': this.namaDrh
    });
  }

}
