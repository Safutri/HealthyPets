import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage } from "../home/home"; 
import { AmbulatorKlienPage } from "../ambulator-klien/ambulator-klien"; 
import { RmKlienPage } from '../rm-klien/rm-klien';
import { RmDrhPage } from '../rm-drh/rm-drh';

@IonicPage()
@Component({
  selector: 'page-rm',
  templateUrl: 'rm.html',
})
export class RmPage {
  idDrh;
  idHewan
  datam: any;
  amb: any; no_reg;
  url = "https://healthypets-webservice.appspot.com/_ah/api/hewan/v1/cari/";
  urlRMDrh =  "https://healthypets-webservice.appspot.com/_ah/api/rekammedikDrh/v1/rekamedikdrh?kode_hewan="; 
  urlRM = "https://healthypets-webservice.appspot.com/_ah/api/rekammedik/v1/rekamedik?kode_hewan=";
   hewan: any; 
  nama: String; 
  umur: any; 
  jenis: String; 
  gender: String; 
  ras: String;
  idResepsionis:any;
  kode_hewan:any;
  lab; rm; idKlien; 
  rm_drh; namaDrh;
  
    constructor(public navCtrl: NavController, 
      public http: HttpClient, 
      public navParams: NavParams,
      private app:App) {
        this.idDrh = navParams.get("idDrh");
        console.log("idDrh "+this.idDrh);
  
        this.idHewan = navParams.get("id");
        console.log("idHewan "+this.idHewan);
  
        this.kode_hewan = navParams.get("kode_hewan");
        console.log("kode_hewan "+this.kode_hewan);
  
        this.idKlien = navParams.get("idKlien");
        console.log("idKlien "+this.idKlien);
  
        this.no_reg = navParams.get("no_reg");
        console.log("no_reg "+this.no_reg);
  
        this.namaDrh = navParams.get("namaDrh");
      console.log("namaDrh masuk : "+this.namaDrh);
   
        this.getRM();
        this.getRMDrh();
        this.getHewan(); 
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad AllKonsultasiPage');
    } 
  
    getRM(){
      this.http.get(this.urlRM+this.kode_hewan).subscribe(
        data => {
           console.log(data);
           this.datam = data;
           this.rm = this.datam.items; 
    
        }, err => {
          console.log(err);  
        }
    
      );
    }
  
    getRMDrh(){
      this.http.get(this.urlRMDrh+this.kode_hewan).subscribe(
        data => {
           console.log(data);
           this.datam = data;
           this.rm_drh = this.datam.items; 
    
        }, err => {
          console.log(err);  
        }
    
      );
    }
    
    getHewan(){
      this.http.get(this.url+this.idHewan).subscribe(
        datas => {
           console.log("data hewan"+this.idHewan);
           console.log(datas); 
            this.hewan = datas;
            this.nama = this.hewan.nama;
            this.umur = this.hewan.umur;
            this.gender = this.hewan.gender;
            this.ras = this.hewan.ras;
            this.jenis = this.hewan.jenis;
    
        }, err => {
          console.log(err); 
        }
    
      );
    }  
    
    goToHome(){
      this.app.getRootNav().push(HomePage, { 
        'id' : this.idDrh,
        'nama':this.namaDrh
      });
    }
  
    kons(id){
      this.navCtrl.push(AmbulatorKlienPage, { 
        "idAmb": id, 
        'idDrh' : this.idDrh, 
        'idHewan': this.idHewan, 
        'idKlien': this.idKlien,
        'namaDrh': this.namaDrh
      });
  }
  
  rekammedik(id){
    this.navCtrl.push(RmKlienPage,{
      "idRM" : id, 
      'idDrh' : this.idDrh, 
      'idHewan': this.idHewan, 
      'idKlien': this.idKlien,
      "kode_hewan":this.kode_hewan,
      "no_reg": this.no_reg,
      'namaDrh':this.namaDrh
    })
  }
  
  rmdrh(id){
    this.navCtrl.push(RmDrhPage,{
      "id" : id, 
      'idDrh' : this.idDrh, 
      'idHewan': this.idHewan, 
      'idKlien': this.idKlien,
      "kode_hewan":this.kode_hewan,
      "no_reg": this.no_reg, 
      "namaDrh": this.namaDrh
    })
  }
  
  }
  