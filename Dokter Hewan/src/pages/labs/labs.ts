import { Component } from '@angular/core';
import { NavController, 
  NavParams,
  LoadingController, 
  ToastController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HasilLabPage } from "../hasil-lab/hasil-lab";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-labs',
  templateUrl: 'labs.html',
})

export class LabsPage {
  idAntrian; idAmb; no_reg; idDrh; kode_hewan;
 
  klien; 
  hewan;
  namaHewan;
  amb;  
  nama:String; labs; 
  namahewan: String; 
  ras: String;
  jenis: String;
  umur: String; namaDrh:string;
  tgl: any;   tgl_lab:any;
  prognosa: String;  diagnosa:string; 
  urlKlien = 'https://healthypets-webservice.appspot.com/_ah/api/klien/v1/klien/search/';
  urlHewan = 'https://healthypets-webservice.appspot.com/_ah/api/hewan/v1/data/';
  urlLab =   'https://healthypets-webservice.appspot.com/_ah/api/lab/v1/hasil/';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    this.idAntrian = navParams.get("idAntrian");
    console.log('id Antrian ListKonsultasiPage '+this.idAntrian);
      
    this.idAmb = navParams.get("idAmb");
    console.log('id Amb ListKonsultasiPage '+this.idAmb);

    this.no_reg = navParams.get("no_reg");
    console.log('no reg ListKonsultasiPage '+this.no_reg);

    this.kode_hewan = navParams.get("kode_hewan");
    console.log('kode_hewan ListKonsultasiPage  '+this.kode_hewan); 

    this.idDrh = navParams.get("idDrh");
    console.log('idDrh ListKonsultasiPage '+this.idDrh);  
    
    this.namaDrh = navParams.get("namaDrh");

    this.getKlien(); 
    this.getHewan(); 
    this.getLab();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabsPage');
  }

  getKlien(){ 
    this.http.get(this.urlKlien+this.no_reg).subscribe(
      data=> { 
        this.klien = data; 
          this.nama = this.klien.nama;  
          this.no_reg = this.klien.no_reg; 
      },
      err => {
        console.log(err);
      }
    );  
  } 

  getLab(){ 
    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3500,
      dismissOnPageChange: true
    }).present();
    this.http.get(this.urlLab+this.idAmb).subscribe(
      data=> { 
        console.log(data);
        this.klien = data; 
        this.labs = this.klien.items; 
      },
      err => {
        console.log(err);
        let toast = this.toastCtrl.create({
          message: 'Hewan ini belum memiliki Hasil Laboratorium',
          duration: 2000,
          position: 'middle'
        });    
        toast.present(toast);
      }
    );  
  } 

  getHewan(){ 
    this.http.get(this.urlHewan+this.kode_hewan).subscribe(
      data=> { 
        this.hewan = data; 
          this.namahewan = this.hewan.nama;  
          this.ras = this.hewan.ras;
          this.jenis = this.hewan.jenis;
          this.umur = this.hewan.umur; 
      },
      err => {
        console.log(err);
      }
    );
  } 

  hlab(id){
    this.navCtrl.push(HasilLabPage, {
    'idAmb' : this.idAmb, 
    'no_reg' : this.no_reg,
    'idAntrian' : this.idAntrian,
    'kode_hewan' : this.kode_hewan, 
    'idDrh' : this.idDrh,
    "id": id
    });
  }

  goToHome(){
    this.navCtrl.setRoot(HomePage, { 
      'id' : this.idDrh,
      'nama' : this.namaDrh
    });
  }
  
}
