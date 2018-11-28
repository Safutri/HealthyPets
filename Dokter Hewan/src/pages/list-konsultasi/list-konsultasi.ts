import { Component } from '@angular/core';
import { NavController, 
  NavParams, 
  LoadingController,
  App } from 'ionic-angular';
import { DataKonsultasiPage } from "../data-konsultasi/data-konsultasi";
import { HttpClient } from '@angular/common/http'; 
import { HomePage } from "../home/home";
import { RekamMedikPage } from "../rekam-medik/rekam-medik";
import { ApiProvider } from '../../providers/api/api';
 
@Component({
  selector: 'page-list-konsultasi',
  templateUrl: 'list-konsultasi.html', 
})


export class ListKonsultasiPage {
   no_reg: any; 
   klien; 
   hewan;
   namaHewan;
   amb; 
   idAmb; idDrh;
   idAntrian; 
   nama:String; labs;
   kode_hewan:String;
   namahewan:String; 
   ras:String;
   jenis:String; namaDrh;
   umur:String;
   tgl:any;   
   tgl_lab:any;
   urlKlien = 'https://healthypets-webservice.appspot.com/_ah/api/klien/v1/klien/search/';
   urlHewan = 'https://healthypets-webservice.appspot.com/_ah/api/hewan/v1/data/';
   urlAmb = 'https://healthypets-webservice.appspot.com/_ah/api/ambulator/v1/ambulator/';  
  // urlAntri = 'https://healthypets-webservice.appspot.com/_ah/api/klienantri/v1/cari/'; 
  KlienReg = {
    nama: "",
    no_reg:""
  };

  HewanKD = {
    namahewan: "",
    umur:"",
    jenis:""
  };
 
  Ambs = {
    tgl:""
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient,
    private app:App,
    public loadingCtrl: LoadingController,
  public ListKons: ApiProvider) {
    
    this.idAntrian = navParams.get("idAntrian"); 
    this.idAmb = navParams.get("idAmb"); 
    this.no_reg = navParams.get("no_reg"); 
    this.kode_hewan = navParams.get("kode_hewan"); 
    this.idDrh = navParams.get("idDrh");  
    this.namaDrh = navParams.get("namaDrh");         

    console.log("id Antrian "+ this.idAntrian)
    console.log("idDrh "+ this.idDrh)
    console.log("no_reg "+ this.no_reg)
    console.log("kode_hewan "+ this.kode_hewan)

    this.getKlien(this.no_reg);  
    this.getHewan(this.kode_hewan);    
    this.getAmbDrh(this.idAmb);  
  } 
  
    getKlien(no_reg){ 
      this.ListKons.getKlienReg(no_reg)
    .then((data)=>{
      this.KlienReg['nama'] = data['nama'];
      this.KlienReg['no_reg'] = data['no_reg'];
        })
        .catch((err) => {
          console.error('Terjadi kesalahan: '+err);
        })
        .catch(() => {
          console.error('Kembalian kosong!');
        }) 
      // this.http.get(this.urlKlien+this.no_reg).subscribe(
      //   data=> { 
      //     this.klien = data; 
      //       this.nama = this.klien.nama;  
      //       this.no_reg = this.klien.no_reg; 
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );  
    } 

    getHewan(kode_hewan){ 
      // this.http.get(this.urlHewan+this.kode_hewan).subscribe(
      //   data=> { 
      //     this.hewan = data; 
      //       this.namahewan = this.hewan.nama;  
      //       this.ras = this.hewan.ras;
      //       this.jenis = this.hewan.jenis;
      //       this.umur = this.hewan.umur; 
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
      this.ListKons.getHewanByKD(kode_hewan)
    .then((data)=>{
      this.HewanKD['namahewan'] = data['nama'];
      this.HewanKD['umur'] = data['umur'];
      this.HewanKD['jenis'] = data['jenis'];
        })
        .catch((err) => {
          console.error('Terjadi kesalahan: '+err);
        })
        .catch(() => {
          console.error('Kembalian kosong!');
        }) 
    } 

    getAmbDrh(idAmb){ 
      this.ListKons.getAmbByDrHewan(idAmb)
      .then((data)=>{
        this.Ambs['tgl'] = data['tgl'];
          })
          .catch((err) => {
            console.error('Terjadi kesalahan: '+err);
          })
          .catch(() => {
            console.error('Kembalian kosong!');
          }) 
      // this.loadingCtrl.create({
      //   content: 'Please wait...',
      //   duration: 3500,
      //   dismissOnPageChange: true
      // }).present();
      // this.http.get(this.urlAmb+this.idAmb).subscribe(
      //   data=> { 
      //     this.amb = data;
      //       this.tgl = this.amb.tgl; 
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
    } 
    
    kons(){
      this.navCtrl.push(DataKonsultasiPage, {
        'no_reg' : this.no_reg,
        'idAntrian' : this.idAntrian,
        'kode_hewan' : this.kode_hewan, 
        'idDrh' : this.idDrh,
        'idAmb' : this.idAmb,
        'namaDrh': this.namaDrh
      });
  }

  rm(no_reg){
    console.log("no reg kirim "+no_reg);
    this.navCtrl.push(RekamMedikPage, {
      'no_reg' : this.no_reg,
      'idAntrian' : this.idAntrian,
      'kode_hewan' : this.kode_hewan, 
      'idDrh' : this.idDrh,
      'idAmb' : this.idAmb,
      'namaDrh': this.namaDrh
    });
  } 
  
    goToHome(){
      this.app.getRootNav().push(HomePage, { 
        'id' : this.idDrh,
        'nama': this.namaDrh
      });
    }

}





