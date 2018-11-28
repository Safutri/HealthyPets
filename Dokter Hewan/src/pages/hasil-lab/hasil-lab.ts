import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ListKonsultasiPage } from "../list-konsultasi/list-konsultasi";

@IonicPage()
@Component({
  selector: 'page-hasil-lab',
  templateUrl: 'hasil-lab.html',
})
export class HasilLabPage {
  k_parasit:String; 
  k_jamur:String;
  keadaan_feses:String;
  p_interna:String;
  protozoa:String;
  mikroba:String;
  warna:String;
  bau:String;
  uji_gula:String;
  uji_protein:String;
  uji_sedimentasi:String;
  warna_darah:String;
  sifat_darah:String;
  natif_protozoa:String;
  natif_bakteri:String; 
  bdm:String;
  bdp:String;
  netrofil:String;
  eosinofil:String;
  basofil:String;
  limfosit:String;
  monosit:String;
  stab:String;
  hb:String;
  ht:String;
  diagnosa:String;
  dif_diag:String 
  prognosa:String;
  nama:string;
  namahewan:string;
  hewan; ras; jenis; umur;
  idDrh; idAmb; idAntrian;
  terapi:String; tgl; no_reg;
  lab; kode_hewan; hasil; klien; idLab;
  urlLab = 'https://healthypets-webservice.appspot.com/_ah/api/lab/v1/jsonlab/';
  urlKlien = 'https://healthypets-webservice.appspot.com/_ah/api/klien/v1/klien/search/';
  urlHewan = 'https://healthypets-webservice.appspot.com/_ah/api/hewan/v1/data/'; 
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient,
    public toastCtrl: ToastController) {
      this.idLab= navParams.get("id");
      this.idAntrian = navParams.get("idAntrian");
      this.idAmb = navParams.get("idAmb");  
      this.no_reg = navParams.get("no_reg"); 
      this.kode_hewan = navParams.get("kode_hewan");  
      this.idDrh = navParams.get("idDrh"); 

      this.getLab();
      this.getKlien();
      this.getHewan();
    }

  ionViewDidLoad() {
    console.log(' HasilLabPage');
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

  getLab(){ 
    this.http.get(this.urlLab+this.idLab).subscribe(
      data=> { 
        this.lab = data; 
          this.tgl = this.lab.tgl;  
          this.diagnosa = this.lab.diagnosa; 
          this.uji_sedimentasi = this.lab.uji_sedimentasi;
          this.natif_protozoa = this.lab.natif_protozoa;
          this. terapi = this.lab.terapi;
          this.k_parasit = this.lab.k_parasit;
          this.warna_darah = this.lab.warna_darah;
          this.dif_diag = this.lab.dif_diag;
          this.warna = this.lab.warna;
          this.limfosit= this.lab.limfosit;
          this.keadaan_feses= this.lab.keadaan_feses;
          this.uji_protein= this.lab.uji_protein;
          this.natif_bakteri= this.lab.natif_bakteri;
          this.k_jamur= this.lab.k_jamur;
          this.basofil= this.lab.basofil;
          this.p_interna= this.lab.p_interna;
          this.mikroba= this.lab.mikroba;
          this.netrofil= this.lab.netrofil;
          this.eosinofil= this.lab.eosinofil;
          this.monosit= this.lab.monosit;
          this.protozoa= this.lab.protozoa;
          this.uji_gula= this.lab.uji_gula;
          this.sifat_darah= this.lab.sifat_darah;
          this.prognosa= this.lab.prognosa;
          this.bau= this.lab.bau;
          this.bdm= this.lab.bdm;
          this.bdp= this.lab.bdp;
          this.stab= this.lab.stab;
          this.hb= this.lab.hb;
          this.ht= this.lab.ht;
        },
      err => {
        console.log(err);
        const toast = this.toastCtrl.create({
          message: 'Hasil Lab belum ada',
          duration: 3000
        });
        this.navCtrl.push(ListKonsultasiPage, {
          'no_reg' : this.no_reg,
          'kode_hewan' : this.kode_hewan,
          'idAmb' : this.idAmb,
          'idDrh' : this.idDrh,
          'idAntrian' : this.idAntrian
        });
        toast.present();
      }
    );  
  }  

}
