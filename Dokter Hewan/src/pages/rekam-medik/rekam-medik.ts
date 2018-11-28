import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ListKonsultasiPage } from "../list-konsultasi/list-konsultasi";

@Component({
  selector: 'page-rekam-medik',
  templateUrl: 'rekam-medik.html',
})
export class RekamMedikPage {

  urlRM = 'https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/rekammedik/v1/data/rekam_medik/';
  urlHewan = 'https://healthypets-webservice.appspot.com/_ah/api/hewan/v1/data/';
  urlKlien = 'https://healthypets-webservice.appspot.com/_ah/api/klien/v1/klien/search/';
  kode_hewan: any;
  rm;
  klien;
  idAntrian;
  no_reg;
  idDrh; idAmb;
  hewan;
  namahewan: string;
  ras: string;
  jenis: string;
  umur: string;
  gender: string;
  lain: string;
  tgl: string;
  obat: string;
  status_awal: string;
  terapi: string;
  diagnosa: string;
  namaDrh: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: HttpClient,
              public toastCtrl: ToastController) { 
      
    this.idAntrian = navParams.get("idAntrian"); 
    this.idAmb = navParams.get("idAmb"); 
    this.kode_hewan = navParams.get('kode_hewan'); 
    this.no_reg = navParams.get("no_reg"); 
    this.kode_hewan = navParams.get("kode_hewan"); 
    this.namaDrh = navParams.get("namaDrh");

      this.getKlien();
      this.getHewan();
      this.getRM();      
  } 

  getKlien(){ 
    this.http.get(this.urlKlien+this.no_reg).subscribe(
      data=> { 
        this.klien = data;  
          this.no_reg = this.klien.no_reg; 
      },
      err => {
        console.log(err);
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
          this.gender = this.hewan.gender; 
      },
      err => {
        console.log(err);
      }
    );
  } 

  getRM(){ 
    this.http.get(this.urlRM+this.idAmb).subscribe(
      data=> { 
        this.rm = data;
          this.tgl = this.rm.tgl;  
          this.lain = this.rm.lain;
          this.obat = this.rm.obat;
          this.status_awal = this.rm.status_awal;
          this.terapi = this.rm.terapi;
          this.diagnosa = this.rm.diagnosa;          
      },
      err => {
        console.log(err);
        const toast = this.toastCtrl.create({
          message: 'Rekam medik belum ada',
          duration: 3000
        });
          this.navCtrl.push(ListKonsultasiPage, {
            'no_reg' : this.no_reg,
            'idAntrian' : this.idAntrian,
            'kode_hewan' : this.kode_hewan, 
            'idDrh' : this.idDrh,
            'idAmb' : this.idAmb,
            'namaDrh': this.namaDrh
          });
        toast.present();
      }
    );
  } 
 
}
