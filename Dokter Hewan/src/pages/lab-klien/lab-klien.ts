import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-lab-klien',
  templateUrl: 'lab-klien.html',
})
export class LabKlienPage {
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
  idDrh; idHewan; idKlien;
  terapi:String; tgl; no_reg;
  lab; kode_hewan; hasil; klien; 
  namaDrh; idLab;
  urlLab = 'https://healthypets-webservice.appspot.com/_ah/api/lab/v1/jsonlab/';
  urlKlien = 'https://healthypets-webservice.appspot.com/_ah/api/klien/v1/klien/';
  urlHewan = 'https://healthypets-webservice.appspot.com/_ah/api/hewan/v1/cari/'; 
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient) {
      this.idLab= navParams.get("idLab");
      console.log('id Lab '+this.idLab);

      this.idKlien= navParams.get("idKlien");
      console.log('id Klien '+this.idKlien);

      this.idHewan = navParams.get("idHewan");
      console.log('id Hewan '+this.idHewan);

      this.namaDrh = navParams.get("namaDrh");
      console.log("namaDrh masuk : "+this.namaDrh);
 
      this.getLab();
      this.getKlien();
      this.getHewan();
    }

  ionViewDidLoad() {
    console.log(' HasilLabPage');
  }

  getKlien(){ 
    this.http.get(this.urlKlien+this.idKlien).subscribe(
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
    this.http.get(this.urlHewan+this.idHewan).subscribe(
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
      }
    );  
  }  

}
