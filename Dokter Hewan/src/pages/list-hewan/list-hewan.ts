import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular'; 
import { HttpClient } from '@angular/common/http';
import { TabsDataPage } from "../tabs-data/tabs-data";

@Component({
  selector: 'page-list-hewan',
  templateUrl: 'list-hewan.html',
})
export class ListHewanPage {

  idKlien;
  idDrh; 
  users: any;
  urls = "https://healthypets-webservice.appspot.com/_ah/api/klien/v1/klien/";

  hewan: any; 
  datam:any
  url = "https://healthypets-webservice.appspot.com/_ah/api/hewan/v1/daftar/";
 
  nama: any; no_reg: any; alamat: any; ktp:any;
  email: any; telp: any; namaDrh;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient) {

    this.idKlien = navParams.get("id");
    console.log("idKlien: "+this.idKlien); 

    this.no_reg = navParams.get("no_reg");
    console.log("no_reg " +this.no_reg);

    this.idDrh = navParams.get("idDrh");
    console.log("idDrh : "+this.idDrh); 

    this.namaDrh = navParams.get("namaDrh");
      console.log("namaDrh masuk : "+this.namaDrh);

    this.getUser();
    this.getHewan();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListHewanPage');
  }

  getUser(){ 
    this.http.get(this.urls+this.idKlien).subscribe(
      data=> {
        console.log(data);
        this.users = data;
          this.nama = this.users.nama; 
          this.no_reg = this.users.no_reg; 
          this.alamat = this.users.alamat;
          this.telp = this.users.telp;
          this.email = this.users.email;
          this.ktp = this.users.ktp;
          console.log("nama klien "+ this.nama);
      },
      err => {
        console.log(err);
      }
    );
  } 
 

  getHewan(){
    this.http.get(this.url+this.idKlien).subscribe(
      datas => {
         console.log("id klien"+this.idKlien);
         console.log(datas);
         this.datam = datas;
         this.hewan = this.datam.items;    
      }, err => {
        console.log(err); 
      }

    );
  }
 
  listkons(id, kode_hewan){
    this.navCtrl.push(TabsDataPage, {
      "id": id,
      "kode_hewan": kode_hewan,
      "idDrh": this.idDrh,
      "idKlien": this.idKlien,
      "no_reg": this.no_reg, 
      "namaDrh": this.namaDrh
    });
  }

}
