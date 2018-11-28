import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular'; 
import { TambahAmbulatorPage } from '../tambah-ambulator/tambah-ambulator'; 
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-pilih-drh',
  templateUrl: 'pilih-drh.html',
})
export class PilihDrhPage { 
  idHewan; 
  idResepsionis; 
  data; send:any;
  drh;
  urlDrh = "https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/drh/v1/drhbyResepsionis/";
  id:any; 
  drh_jaga:any;
  urlPilih = "https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/pilihdrh/v1/pilihDrh";
  isenabled=null;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController) {  
      
      this.send = this.formBuilder.group(
        {
          drh_jaga: ['', Validators.required]
        });

    this.idHewan = navParams.get("id");
    console.log("id Hewan "+this.idHewan);
    
    this.idResepsionis = localStorage.getItem('idResepsionisLocal');
    console.log("id local: "+this.idResepsionis);  
    
    this.getDrh(); 
  }

  ionViewDidLoad() {
    console.log('PilihDrhPage');
  }

  pilih() { 
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    }); 
      loader.present();
      
    var body = { 
      "idResepsionis" :this.navParams.get("idResepsionis"),
      "drh_jaga": this.send.value['drh_jaga']
    };
    
    this.http
    .post(this.urlPilih, body)
    .subscribe(
        data => {
          console.log(data); 
          console.log("idnya " +data["id"]);    
          
          setTimeout(() => {
            loader.dismiss();
            this.navCtrl.push(TambahAmbulatorPage, {
              'idpilih' : data["id"],
              'idHewan': this.idHewan,
               'idResepsionis': this.idResepsionis
            });  
          }, 1000)         
      },
        err => {
          console.log("ERROR!: ", err);
        }
    );
  }
  
  getDrh(){
    this.http.get(this.urlDrh+this.idResepsionis).subscribe(
      data => { 
        this.data = data;
        this.drh = this.data.items;
      }, err => {
        console.log(err);
       
      }
  
    );

  } 

}
