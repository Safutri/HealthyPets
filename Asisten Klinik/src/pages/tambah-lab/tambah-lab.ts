import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from "ionic-angular";
import { HttpClient } from '@angular/common/http';
import { DaftarAmbulatorPage } from '../daftar-ambulator/daftar-ambulator';

@Component({
  selector: 'page-tambah-lab',
  templateUrl: 'tambah-lab.html',
})
export class TambahLabPage {

  idAmb;
  idHewan;
  idResepsionis;
  urlLab = "https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/lab/v1/HLabbaru"; 
  urlAmb = "https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/ambulator/v1/ambulator/"; 

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
  terapi:String;
  drh_jaga:String;
  tgl:any;
  kode_hewan:String
  data; 
  amb; 
  datas;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient,
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController) { 
     
    this.idHewan = navParams.get("idHewan");
        console.log('id Hewan '+this.idHewan);

    this.idAmb = navParams.get("idAmb");
        console.log('id Ambulator '+this.idAmb);

    this.getAmb();

    this.idResepsionis = localStorage.getItem('idResepsionisLocal');
    console.log("id local: "+this.idResepsionis); 
  
  }

  ionViewDidLoad() {
    console.log('Page TambahLabPage');
  }

  getAmb(){
    this.http.get(this.urlAmb+this.idAmb).subscribe(
      datas => { 
        this.data = datas; 
        this.drh_jaga = this.data.drh_jaga; 
        this.tgl = this.data.tgl;
        this.kode_hewan = this.data.kode_hewan;
        console.log("drh_jaga "+this.drh_jaga +"tgl "+this.tgl);
      }, err => {
        console.log(err);
       
      }  
    );
  }

      send(){
        var body = { 
          "idAmb":this.idAmb,
          "idHewan":this.idHewan,
          "idAmbulator":this.idAmb,
          "idResepsionis":this.idResepsionis,
          "k_parasit": this.k_parasit,
          "k_jamur": this.k_jamur,
          "keadaan_feses": this.keadaan_feses,
          "p_interna": this.p_interna,
          "protozoa": this.protozoa, 
          "mikroba": this.mikroba,
          "warna": this.warna,
          "bau": this.bau,
          "uji_gula": this.uji_gula,
          "uji_protein": this.uji_protein,
          "uji_sedimentasi": this.uji_sedimentasi,
          "warna_darah": this.warna_darah,
          "sifat_darah": this.sifat_darah,
          "natif_protozoa": this.natif_protozoa,
          "natif_bakteri": this.natif_bakteri,
          "bdm": this.bdm,
          "bdp": this.bdp,
          "netrofil": this.netrofil,
          "eosinofil": this.eosinofil,
          "basofil": this.basofil,
          "limfosit": this.limfosit,
          "monosit": this.monosit,
          "stab": this.stab,
          "hb": this.hb,
          "ht": this.ht,
          "diagnosa": this.diagnosa,
          "dif_diag": this.dif_diag,
          "prognosa": this.prognosa,
          "terapi": this.terapi,
          "drh_jaga":this.drh_jaga,
          "tgl":this.tgl,
          "kode_hewan":this.kode_hewan

        };

        this.http
        .post(this.urlLab, body)
        .subscribe(
            data => {
              console.log(data);

            let loader = this.loadingCtrl.create({
              content: "Please wait..."
            });
            // show message
              let toast = this.toastCtrl.create({
                showCloseButton: true, 
                message: 'Sending Success!',
                duration: 3000,
                position: 'bottom'
              }); 
              loader.present();

              setTimeout(() => {
                loader.dismiss();
                toast.present(); 
                this.navCtrl.push(DaftarAmbulatorPage, {
                    "id": this.idHewan,
                    "idResepsionis": this.idResepsionis
                  });
              }, 3000)
        },
        err => {
          console.log("ERROR!: ", err);
        }
      );
    }
}
