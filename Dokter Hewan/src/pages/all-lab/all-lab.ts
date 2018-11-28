import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage } from "../home/home"; 
import { LabKlienPage } from '../lab-klien/lab-klien';
 
@Component({
  selector: 'page-all-lab',
  templateUrl: 'all-lab.html',
})
export class AllLabPage {
  idDrh;
  idHewan
  datam: any; 
  url = "https://healthypets-webservice.appspot.com/_ah/api/hewan/v1/cari/"; 
  urlHasilLab= 'https://healthypets-webservice.appspot.com/_ah/api/lab/v1/daftar/';
  hewan: any; 
  nama: String; 
  umur: any; 
  jenis: String; 
  gender: String; 
  ras: String;
  idResepsionis:any;
  kode_hewan:any;
  lab; rm; idKlien;
  namaDrh;
  
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

        this.namaDrh = navParams.get("namaDrh");
          console.log("namaDrh masuk : "+this.namaDrh);
   
        this.getHewan();
        this.getHasilLab();
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
    
    getHasilLab(){
      this.http.get(this.urlHasilLab+this.idHewan).subscribe(
        data => {
           console.log("Hasil Lab id Hewan: "+this.idHewan);
           console.log(data);
           this.datam = data;
           this.lab = this.datam.items;   
        }, err => {
          console.log(err);  
        }  
      );  
    }
  
    goToHome(){
      this.app.getRootNav().push(HomePage, { 
        'id' : this.idDrh,
        'nama': this.namaDrh
      });
    }

    labs(id){
      this.navCtrl.push(LabKlienPage,{
      'idLab' : id,  
      'idHewan': this.idHewan, 
      'idKlien': this.idKlien,
      'namaDrh': this.namaDrh
      });
    }   
  
  }
  