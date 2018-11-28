import { Component } from '@angular/core';
import {NavController, 
        LoadingController, 
        ToastController, 
        NavParams, 
        AlertController } from "ionic-angular";
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder } from '@angular/forms';
import { ListHewanPage } from '../list-hewan/list-hewan';

@Component({
  selector: 'page-tambah-rm',
  templateUrl: 'tambah-rm.html',
})
export class TambahRmPage {
  kode_hewan;
  idAmb;
  idKlien;
  amb;
  klien;
  hewan; 
  id_hewan;
  namaHewan;
  namahewan:String;
  ras:String; 
  diagnosa:String
  gender:String; 
  obat:String;
  jenis: String; 
  status_awal:String;
  umur:String; 
  terapi:String;
  nama:String;
  id:any; 
  idDrh; 
  tgl;
  telp:String; 
  lain_rm:String; 
  no_reg:any; 
  idHewan;
  namaDrh; 
  isenabled=null;
  send:any;

  urlHewan = 'https://healthypets-webservice.appspot.com/_ah/api/hewan/v1/data/'; 
  urlKlien = 'https://healthypets-webservice.appspot.com/_ah/api/klien/v1/klien/';
  urlDelete = 'https://healthypets-webservice.appspot.com/_ah/api/klienantri/v1/antri/';
  urlAmb = 'https://healthypets-webservice.appspot.com/_ah/api/ambulator/v1/ambulator/';

  constructor (public navCtrl: NavController, 
      public navParams: NavParams, 
        public http: HttpClient,
          public loadingCtrl: LoadingController, 
            public toastCtrl: ToastController, 
                 public alerCtrl: AlertController,
                 private formBuilder: FormBuilder) { 

      this.idDrh = navParams.get("idDrh");
        console.log('idDrh '+this.idDrh)

      this.idHewan = navParams.get("idHewan");
        console.log('idHewan '+this.idHewan);

      this.kode_hewan = navParams.get("kode_hewan");
        console.log('kode_hewan '+this.kode_hewan);

      this.idKlien = navParams.get("idKlien");
        console.log('idKlien '+this.idKlien);

      this.no_reg = navParams.get("no_reg"); 
        console.log("no reg "+this.no_reg);

       this.namaDrh = navParams.get("namaDrh");
         console.log("namaDrh masuk : "+this.namaDrh);

        this.getKlien(this.no_reg);
        this.getHewan();
        this.tgl=new Date();

        this.send = this.formBuilder.group(
          {
            tgl: ['', Validators.required],
            status_awal: ['', Validators.required],
            diagnosa: ['', Validators.required],
            terapi: ['', Validators.required],
            obat: ['', Validators.required],
            lain_rm: ['', Validators.required]
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TambahRmPage');
  }
  
  getKlien(no_reg){ 
    this.http.get(this.urlKlien+this.idKlien).subscribe(
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
        console.log(data);
        this.hewan = data;
        this.id = this.hewan.idHewan;
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

  simpan(){
    var body = {   
      'tgl':this.send.value['tgl'],
      "kode_hewan":this.kode_hewan,
      "no_reg":this.no_reg,
      "diagnosa":this.send.value['diagnosa'],
      "obat":this.send.value['obat'],
      "status_awal":this.send.value['status_awal'],
      "terapi":this.send.value['terapi'],
      "lain":this.send.value['lain'], 
      "nama_drh":this.namaDrh          
    };

    this.http
    .post('https://healthypets-webservice.appspot.com/_ah/api/rekammedikDrh/v1/rekamedikDrh', body)
    .subscribe(
        data => {
          console.log(data); 
           this.navCtrl.setRoot(ListHewanPage,{
           "idDrh":this.idDrh,
           "kode_hewan":this.kode_hewan,
           "id":this.idKlien,
           "no_reg":this.no_reg
          }) 
       },
    err => {
      console.log("ERROR!: ", err);
    }
  );
} 
 
}
