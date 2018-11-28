import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { RmKlienPage } from '../rm-klien/rm-klien';

@IonicPage()
@Component({
  selector: 'page-lab-amb',
  templateUrl: 'lab-amb.html',
})
export class LabAmbPage {
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
  stab:String; data;
  hb:String;
  ht:String;
  diagnosa:String;
  dif_diag:String 
  prognosa:String;
  nama:string;
  namahewan:string;
  idHewan; idRM; idKlien;
  namaDrh;
  hewan; ras; jenis; umur;
  idDrh; idAmb; idAntrian;
  terapi:String; tgl; no_reg;
  lab; kode_hewan; hasil; klien; idLab;
  urls = 'https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/';
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient,
    public toastCtrl: ToastController) {
      this.idAmb = navParams.get("idAmb");  
      console.log("idAmbs di lab ambs "+this.idAmb);
      this.idDrh = navParams.get("idDrh");
      console.log("idDrh "+this.idDrh);
  
      this.idHewan = navParams.get("idHewan");
      console.log("idHewan lab ambs "+this.idHewan);
  
      this.idKlien = navParams.get("idKlien");
      console.log("idKlien lab ambs "+this.idKlien);
  
      this.idRM = navParams.get("idRM");
      console.log("idRM lab ambs "+this.idRM);
  
      this.kode_hewan = navParams.get("kode_hewan");
      console.log("kode_hewan lab ambs "+this.kode_hewan);
  
      this.no_reg = navParams.get("no_reg");
      console.log("no_reg lab ambs "+this.no_reg);
  
      this.namaDrh = navParams.get("namaDrh");
      console.log("namaDrh lab ambs: "+this.namaDrh);
       
      this.getLab();
      this.getKlien();
      this.getHewan();
    }

  ionViewDidLoad() {
    console.log(' HasilLabPage');
  }

  getKlien(){ 
    this.http.get(this.urls+'klien/v1/klien/search/'+this.no_reg).subscribe(
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
    this.http.get(this.urls+'hewan/v1/data/'+this.kode_hewan).subscribe(
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
    this.http.get(this.urls+'lab/v1/cariLabs/'+this.idAmb+'/'+this.idAmb).subscribe(
      data=> { 
        this.data = data;
        this.lab = this.data.items; 
        },
      err => {
        console.log(err);
        const toast = this.toastCtrl.create({
          message: 'Hasil Lab belum ada',
          duration: 3000
        });
        this.navCtrl.setRoot(RmKlienPage, {
          "idAmb": this.idAmb,
          'idDrh' : this.idDrh,  
          "no_reg":this.no_reg,
          "kode_hewan":this.kode_hewan,
          "namaDrh":this.namaDrh,
          "idRM": this.idRM,
          "idKlien":this.idKlien,
          "idHewan":this.idHewan,
        });
        toast.present(); 
      }
    );  
  }  

}
