import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from "ionic-angular";
import { AntriDrhPage  } from '../antri-drh/antri-drh'; 
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder } from '@angular/forms';
 
@Component({
  selector: 'page-tambah-ambulator',
  templateUrl: 'tambah-ambulator.html',
})
export class TambahAmbulatorPage {
  idHewan; idResepsionis; idpilih; 
  tgl: any; sinyalmen: any; anamnesa: any; gizi: any; tempramen: any; habitat: any; frek_nafas: any;
  frek_pulsus: any; suhu_tubuh: any; kulit_bulu: any; sedir_mata: any; sedir_hidung: any; sedir_mulut: any;
  sedir_anus: any; k_limfase: any; a_darah: any; a_nafas: any; a_cerna: any; a_kelamin: any; u_saraf: any;
  ang_gerak: any; lain: any; drh_jaga: any; no_reg:any; ktp:any; kode_hewan:any;
  urlDrh = "https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/drh/v1/drhbyResepsionis/";
  urlPilih = 'https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/pilihdrh/v1/jsonpilihdrh/';
  urlHewan = 'https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/hewan/v1/cari/';
  data; drh; id;
  sends:any;
  namahewan:string;
  gender: String;; 
  jenis: String; 
  ttl: any; 
  umur: String; 
  ras: String; 
  warna: String;
isenabled=null;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient,
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder) {  
      this.tgl=new Date();
    this.id = [];

    this.idHewan = navParams.get("idHewan");
    console.log("id Hewan di tbh amb "+this.idHewan);
    
    this.idResepsionis = localStorage.getItem('idResepsionisLocal');
    console.log("id local: "+this.idResepsionis); 

    this.idpilih = navParams.get("idpilih");
    console.log("id Pilih "+this.idpilih);
 
    this.getPilih();     
    this.getHewan();

    this.sends = this.formBuilder.group(
      {
        tgl: ['', Validators.required],
        sinyalmen: ['', Validators.required],
        anamnesa: ['', Validators.required],
        gizi: ['', Validators.required],
        tempramen: ['', Validators.required],
        habitat: ['', Validators.required],
        frek_nafas: ['', Validators.required],
        frek_pulsus: ['', Validators.required],
        suhu_tubuh: ['', Validators.required],
        kulit_bulu: ['', Validators.required],
        sedir_mata: ['', Validators.required],
        sedir_hidung: ['', Validators.required],
        sedir_anus: ['', Validators.required],
        sedir_mulut: ['', Validators.required],
        k_limfase: ['', Validators.required],
        a_nafas: ['', Validators.required],
        a_cerna: ['', Validators.required],
        a_kelamin: ['', Validators.required],
        a_darah: ['', Validators.required],
        u_saraf: ['', Validators.required],
        ang_gerak: ['', Validators.required],
        lain: ['', Validators.required]
      });
  }

  getHewan(){
    this.http.get(this.urlHewan+this.idHewan).subscribe(
      data => { 
        this.data = data;
        console.log("data noreg: "+this.data);
        this.no_reg = this.data.no_reg; 
        this.namahewan = this.data.nama
        this.ktp = this.data.ktp;
        this.kode_hewan = this.data.kode_hewan;
        console.log("no_reg " + this.no_reg);
        console.log("kode hewan " + this.kode_hewan);
      }, err => {
        console.log(err);
       
      }  
    );
  }

  getPilih(){
    this.http.get(this.urlPilih+this.idpilih).subscribe(
      data => { 
        this.data = data;
        this.drh_jaga = this.data.drh_jaga; 
        console.log("drh dipilih " + this.drh_jaga);
      }, err => {
        console.log(err);
       
      }  
    );
  } 

  send(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    }); 
      loader.present();
    var body = { 
      "id":this.idHewan,
      "idPilih": this.idpilih,
      "ktp": this.ktp,
      "no_reg": this.no_reg,
      "sinyalmen":this.sends.value['sinyalmen'],
      "tgl":this.sends.value['tgl'],
      "anamnesa":this.sends.value['anamnesa'],
      "gizi":this.sends.value['gizi'],
      "tempramen":this.sends.value['tempramen'],
      "habitat":this.sends.value['habitat'], 
      "frek_nafas":this.sends.value['frek_nafas'],
      "frek_pulsus":this.sends.value['frek_pulsus'],
      "suhu_tubuh":this.sends.value['suhu_tubuh'],
      "kulit_bulu":this.sends.value['kulit_bulu'],
      "sedir_mata":this.sends.value['sedir_mata'],
      "sedir_mulut":this.sends.value['sedir_mulut'],
      "sedir_hidung":this.sends.value['sedir_hidung'],
      "sedir_anus":this.sends.value['sedir_anus'],
      "k_limfase":this.sends.value['k_limfase'],
      "a_nafas":this.sends.value['a_nafas'],
      "a_darah":this.sends.value['a_darah'],
      "a_cerna":this.sends.value['a_cerna'],
      "a_kelamin":this.sends.value['a_kelamin'],
      "u_saraf":this.sends.value['u_saraf'],
      "ang_gerak":this.sends.value['ang_gerak'],
      "lain":this.sends.value['lain'],
      "drh_jaga":this.drh_jaga,
      "kode_hewan":this.kode_hewan
    };

  
    this.http
    .post('https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/ambulator/v1/baru/', body)
    .subscribe(
        data => {
          console.log(data);   
  
          setTimeout(() => {
            loader.dismiss(); 
            this.navCtrl.push(AntriDrhPage, {
              "drh_jaga": this.drh_jaga,
                "idHewan": this.idHewan,
                "id": this.idResepsionis,
                "kode_hewan":this.kode_hewan,
                'idAmb': data["id"],
                "drhPilih":this.idpilih
              });
          }, 2000)
    },
    err => {
      console.log("ERROR!: ", err);
    }
  );
}
    
}
